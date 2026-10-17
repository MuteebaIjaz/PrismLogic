
export const handler = async (event) => {
  // Handle CORS preflight options request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: 'Method Not Allowed. Only POST requests are supported.',
      }),
    }
  }

  try {
    // Parse incoming request body
    const body = event.body ? JSON.parse(event.body) : {}

    // Spam protection: silent drop if honeypot is filled
    if (body.honeypot && String(body.honeypot).trim() !== '') {
      console.warn('[submit-lead] Honeypot triggered, dropping submission quietly.')
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: true,
          message: 'Lead inquiry received.',
        }),
      }
    }

    // Enrich payload with ISO timestamp and origin metadata
    const payload = {
      name: body.name ? String(body.name).trim() : '',
      email: body.email ? String(body.email).trim().toLowerCase() : '',
      company: body.company ? String(body.company).trim() : '',
      phone: body.phone ? String(body.phone).trim() : '',
      service: body.service || 'AI Automation',
      budget: body.budget || 'Not decided yet',
      message: body.message ? String(body.message).trim() : '',
      consent: true,
      source: 'website-contact-form',
      submittedAt: new Date().toISOString(),
      pageUrl: body.pageUrl || 'https://prismlogic.io',
    }

    // Retrieve the target n8n webhook URL from environment variables
    const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL

    if (!webhookUrl || typeof webhookUrl !== 'string' || !webhookUrl.startsWith('http')) {
      console.error('[submit-lead] N8N_LEAD_WEBHOOK_URL is missing or invalid:', webhookUrl)
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Server configuration error: N8N_LEAD_WEBHOOK_URL environment variable is not configured.',
        }),
      }
    }

    console.log('[submit-lead] Forwarding lead to n8n webhook:', webhookUrl)

    // Forward payload to n8n Lead Capture webhook with a 15-second timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text().catch(() => '')
      console.error(
        `[submit-lead] n8n returned error status ${n8nResponse.status}: ${errorText}`
      )
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: `n8n webhook responded with status ${n8nResponse.status}`,
        }),
      }
    }

    let responseData = {}
    try {
      responseData = await n8nResponse.json()
    } catch {
      responseData = { message: 'Workflow triggered successfully' }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message:
          responseData.message ||
          "Thanks! Our AI assistant is reviewing your request, and you'll hear from us shortly.",
        data: responseData,
      }),
    }
  } catch (error) {
    console.error('[submit-lead] Unexpected error processing lead:', error)

    const isTimeout = error instanceof Error && error.name === 'AbortError'
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: isTimeout
          ? 'Request timed out waiting for the qualification workflow. Please try again.'
          : error instanceof Error
            ? error.message
            : 'Internal server error while processing your inquiry.',
      }),
    }
  }
}
