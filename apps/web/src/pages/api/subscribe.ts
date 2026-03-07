import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  let email: string | undefined

  const contentType = request.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({}))
    email = body.email
  } else {
    const form = await request.formData().catch(() => null)
    email = form?.get('email')?.toString()
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ message: 'Valid email address is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // ----------------------------------------------------------------
  // Integrate your preferred email service here.
  //
  // Buttondown:
  //   const res = await fetch('https://buttondown.email/api/emails/embed-subscribe/<username>', {
  //     method: 'POST',
  //     body: new URLSearchParams({ email }),
  //   })
  //
  // ConvertKit:
  //   const FORM_ID = import.meta.env.CONVERTKIT_FORM_ID
  //   const API_KEY = import.meta.env.CONVERTKIT_API_KEY
  //   await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ api_key: API_KEY, email }),
  //   })
  //
  // Mailchimp, Resend Audiences, or any other provider can be added the same way.
  // ----------------------------------------------------------------

  // Remove this stub and replace with a real integration above.
  const subscribeEnabled = import.meta.env.SUBSCRIBE_ENABLED === 'true'
  if (!subscribeEnabled) {
    return new Response(JSON.stringify({ message: 'Subscription is not configured yet.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ message: 'Subscribed successfully.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
