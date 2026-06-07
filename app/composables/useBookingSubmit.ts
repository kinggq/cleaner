import type { BookingForm, PriceBreakdown } from '~/types/booking'

export function useBookingSubmit() {
  const config = useRuntimeConfig()
  const router = useRouter()

  const buildWhatsAppMessage = (
    form: BookingForm,
    pricing: PriceBreakdown,
    formatEUR: (n: number) => string,
  ) => {
    const serviceLabel =
      form.serviceType === 'standard'
        ? 'Standard Cleaning'
        : 'Deep / End of Tenancy Cleaning'

    const addonLines =
      pricing.addonItems.length > 0
        ? pricing.addonItems.map((a) => `• ${a.label}: ${formatEUR(a.price)}`).join('\n')
        : '• None'

    return [
      `🧹 *New Booking Request – ${config.public.businessName}*`,
      '',
      `*Service:* ${serviceLabel}`,
      `*Duration:* ${pricing.hours} hours @ ${formatEUR(pricing.hourlyRate)}/hr`,
      `*Add-ons:*`,
      addonLines,
      `*Estimated Total:* ${formatEUR(pricing.total)}`,
      '',
      `*Date:* ${form.date}`,
      `*Time:* ${form.timeSlot}`,
      '',
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Email:* ${form.email}`,
      `*Eircode:* ${form.eircode.toUpperCase()}`,
      form.address ? `*Address:* ${form.address}` : '',
      form.notes ? `*Notes:* ${form.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n')
  }

  const submitBooking = (
    form: BookingForm,
    pricing: PriceBreakdown,
    formatEUR: (n: number) => string,
  ) => {
    const payload = {
      ...form,
      pricing,
      submittedAt: new Date().toISOString(),
    }

    console.log('[Booking Submission]', payload)

    const message = buildWhatsAppMessage(form, pricing, formatEUR)
    const whatsappUrl = `https://wa.me/${config.public.whatsappNumber}?text=${encodeURIComponent(message)}`

    if (import.meta.client) {
      sessionStorage.setItem('lastBooking', JSON.stringify(payload))
      window.open(whatsappUrl, '_blank')
    }

    router.push('/success')
  }

  return { submitBooking, buildWhatsAppMessage }
}
