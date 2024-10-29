import { Resend } from 'resend';

import MagicLinkEmail from '../emails/MagicLinkEmail'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationRequest(params: { identifier: any; url: any; provider: any; theme: any; }) {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)

  try {
    const data = await resend.emails.send({
      from: 'Misc <noreply@trueflowing.com>',
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      react: MagicLinkEmail({ url, host })
    })
    return { success: false, data }
  } catch (error) {
    throw new Error('Failed to send the verification Email.')
  }
}

function text({ url, host }:{url:string,host:string}) {
  return `Sign in to ${host}\n${url}\n\n`
}
