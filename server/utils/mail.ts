import nodemailer from 'nodemailer'
import type { BookingForm, PriceBreakdown } from '~/types/booking'

export interface BookingEmailPayload {
  id: string
  form: BookingForm
  pricing: PriceBreakdown
  serviceLabel: string
}

function formatEUR(amount: number) {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function buildEmailBody(payload: BookingEmailPayload) {
  const { id, form, pricing, serviceLabel } = payload
  const addonLines =
    pricing.addonItems.length > 0
      ? pricing.addonItems.map((a) => `• ${a.label}: ${formatEUR(a.price)}`).join('\n')
      : '• None'

  return [
    `New booking request – ${id}`,
    '',
    `Service: ${serviceLabel}`,
    `Duration: ${pricing.hours} hours @ ${formatEUR(pricing.hourlyRate)}/hr`,
    `Add-ons:`,
    addonLines,
    `Estimated total: ${formatEUR(pricing.total)}`,
    '',
    `Date: ${form.date}`,
    `Time: ${form.timeSlot}`,
    '',
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Eircode: ${form.eircode.toUpperCase()}`,
    form.address ? `Address: ${form.address}` : null,
    form.notes ? `Notes: ${form.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

export async function sendBookingNotification(payload: BookingEmailPayload) {
  const config = useRuntimeConfig()
  const { smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom, notifyEmail, public: pub } =
    config

  if (!smtpHost || !smtpUser || !smtpPass || !notifyEmail) {
    console.warn(
      '[mail] SMTP not fully configured — booking saved but email was skipped.',
      `Set NUXT_SMTP_HOST, NUXT_SMTP_USER, NUXT_SMTP_PASS (notify: ${notifyEmail || 'unset'}).`,
    )
    return { sent: false as const, reason: 'smtp_not_configured' as const }
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort) || 587,
    secure: Number(smtpPort) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const text = buildEmailBody(payload)

  await transporter.sendMail({
    from: smtpFrom || smtpUser,
    to: notifyEmail,
    replyTo: payload.form.email,
    subject: `New booking – ${payload.form.name} – ${formatEUR(payload.pricing.total)}`,
    text,
    html: `<pre style="font-family:ui-sans-serif,system-ui,sans-serif;white-space:pre-wrap">${text}</pre><p style="color:#64748b;font-size:12px">${pub.businessName}</p>`,
  })

  return { sent: true as const }
}
