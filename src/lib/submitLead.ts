import type { LeadFormData, LeadSubmissionPayload } from '../types'

export interface SubmitLeadResponse {
  success: boolean
  message: string
  leadId?: string
  qualificationStatus?: 'qualified' | 'priority' | 'reviewed'
  isDemo?: boolean
}

/**
 * Submits lead data to the Netlify serverless function (/.netlify/functions/submit-lead)
 * which forwards securely to the automated n8n Lead Capture & Qualification webhook.
 */
export async function submitLead(formData: LeadFormData): Promise<SubmitLeadResponse> {
  // Honeypot check - if filled, silently succeed without triggering webhook
  if (formData.honeypot && formData.honeypot.trim() !== '') {
    console.warn('[PrismLogic Spam Protection] Honeypot field triggered.')
    return {
      success: true,
      message: 'Inquiry received.',
      qualificationStatus: 'reviewed',
    }
  }

  const payload: LeadSubmissionPayload = {
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    company: formData.company.trim(),
    phone: formData.phone?.trim() || '',
    service: formData.service,
    budget: formData.budget || 'Not decided yet',
    message: formData.message.trim(),
    consent: true,
    source: 'website-contact-form',
    submittedAt: new Date().toISOString(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : 'https://prismlogic.io',
  }

  // Primary endpoint: Netlify Serverless Function to prevent CORS
  const netlifyEndpoint = '/.netlify/functions/submit-lead'

  // Direct webhook fallback for local dev when Netlify functions daemon is not running
  const directWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    let response = await fetch(netlifyEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    // Local development fallback: if Vite dev server returns 404 for Netlify functions
    if (
      response.status === 404 &&
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ) {
      console.warn(
        '[PrismLogic] /.netlify/functions/submit-lead returned 404 on localhost. Falling back to direct n8n webhook...'
      )
      if (directWebhookUrl && typeof directWebhookUrl === 'string' && directWebhookUrl.startsWith('http')) {
        response = await fetch(directWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })
      }
    }

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errText = ''
      try {
        const errJson = await response.json()
        errText = errJson.error || errJson.message || ''
      } catch {
        errText = await response.text().catch(() => '')
      }
      throw new Error(errText || `Server responded with status ${response.status}`)
    }

    let responseData
    try {
      responseData = await response.json()
    } catch {
      responseData = { message: 'Inquiry received successfully' }
    }

    return {
      success: true,
      message:
        responseData.message ||
        "Thanks! Our AI assistant is reviewing your request, and you'll hear from us shortly.",
      leadId: responseData.leadId || responseData.id,
      qualificationStatus: responseData.qualificationStatus || 'qualified',
    }
  } catch (error: unknown) {
    clearTimeout(timeoutId)

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out after 15 seconds. Please try again or reach out directly.')
    }

    const message = error instanceof Error ? error.message : 'Failed to connect to the qualification service.'
    console.error('[PrismLogic Lead Submission Error]:', error)
    throw new Error(message)
  }
}
