import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const webhookUrl =
    env.N8N_LEAD_WEBHOOK_URL ||
    env.VITE_N8N_WEBHOOK_URL ||
    'https://muteebabaloch.app.n8n.cloud/webhook/agency-contact'

  return {
    plugins: [
      react(),
      {
        name: 'local-netlify-functions-middleware',
        configureServer(server) {
          server.middlewares.use('/.netlify/functions/submit-lead', async (req, res) => {
            if (req.method === 'OPTIONS') {
              res.setHeader('Access-Control-Allow-Origin', '*')
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
              res.statusCode = 200
              res.end()
              return
            }

            if (req.method === 'POST') {
              let body = ''
              req.on('data', (chunk) => {
                body += chunk
              })
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body || '{}')
                  const payload = {
                    ...data,
                    submittedAt: new Date().toISOString(),
                    source: 'website-contact-form',
                  }

                  const n8nResponse = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                    },
                    body: JSON.stringify(payload),
                  })

                  const responseText = await n8nResponse.text()
                  res.setHeader('Content-Type', 'application/json')
                  res.setHeader('Access-Control-Allow-Origin', '*')
                  res.statusCode = n8nResponse.status
                  res.end(responseText)
                } catch (err: unknown) {
                  res.setHeader('Content-Type', 'application/json')
                  res.setHeader('Access-Control-Allow-Origin', '*')
                  res.statusCode = 500
                  const message = err instanceof Error ? err.message : 'Internal Server Error'
                  res.end(JSON.stringify({ error: message }))
                }
              })
            } else {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method Not Allowed' }))
            }
          })
        },
      },
    ],
  }
})
