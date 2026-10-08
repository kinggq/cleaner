import type { BookingForm, PriceBreakdown } from '~/types/booking'

export interface BookingSubmitResult {
  id: string
  pricing: PriceBreakdown
  emailSent: boolean
  createdAt: string
}

export function useBookingSubmit() {
  const router = useRouter()
  const submitting = ref(false)
  const submitError = ref<string | null>(null)

  const submitBooking = async (form: BookingForm) => {
    submitting.value = true
    submitError.value = null

    try {
      const result = await $fetch<BookingSubmitResult>('/api/bookings', {
        method: 'POST',
        body: form,
      })

      if (import.meta.client) {
        sessionStorage.setItem(
          'lastBooking',
          JSON.stringify({
            id: result.id,
            pricing: result.pricing,
            emailSent: result.emailSent,
            submittedAt: result.createdAt,
          }),
        )
      }

      await router.push('/success')
      return result
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string }; statusMessage?: string; message?: string }
      submitError.value =
        e?.data?.statusMessage ||
        e?.statusMessage ||
        e?.message ||
        'Failed to submit booking. Please try again.'
      return null
    } finally {
      submitting.value = false
    }
  }

  return { submitBooking, submitting, submitError }
}
