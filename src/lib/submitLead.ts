import type { LeadFormData, LeadSubmissionPayload } from '../types'

export interface SubmitLeadResponse {
  success: boolean
  message: string
  leadId?: string
  qualificationStatus?: 'qualified' | 'priority' | 'reviewed'
  isDemo?: boolean
}

/**
 * Submits lead data to the configured n8n webhook with timeout and typed payload
 */
export async function submitLead(formData: LeadFormData): Promise<SubmitLeadResponse> {
  // Honeypot check - if filled, silently succeed without triggering webhook
  if (formData.honeypot && formData.honeypot.trim() !== '') {
    console.warn('[PrismLogic Spam Protection] Honeypot field triggered.')
    return {
      success: true,
      message: 'Lead received.',
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

  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL

  // If webhook URL is not configured or placeholder, run realistic simulated workflow
  if (!webhookUrl || webhookUrl.includes('example.com')) {
    console.info(
      '%c[PrismLogic Lead System]%c Webhook URL not configured or set to example. Running simulated n8n qualification pipeline...',
      'color: #22D3EE; font-weight: bold;',
      'color: #C4B5FD;'
    )
    console.info('Payload to be delivered in production:', payload)

    // Simulate network round-trip & AI qualification processing
    await new Promise((resolve) => setTimeout(resolve, 1400))

    return {
      success: true,
      message: "Thanks! Our AI assistant is reviewing your request, and you'll hear from us shortly.",
      leadId: `LEAD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      qualificationStatus: 'qualified',
      isDemo: true,
    }
  }

  // Production n8n Webhook POST with 15-second AbortController timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`n8n webhook responded with status ${response.status}: ${response.statusText}`)
    }

    let responseData
    try {
      responseData = await response.json()
    } catch {
      responseData = { message: 'Workflow triggered successfully' }
    }

    return {
      success: true,
      message: responseData.message || "Thanks! Our AI assistant is reviewing your request, and you'll hear from us shortly.",
      leadId: responseData.id || `LEAD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
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
