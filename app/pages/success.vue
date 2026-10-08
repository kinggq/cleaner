<script setup lang="ts">
import { ArrowRight, CheckCircle2, Home, Mail } from '@lucide/vue'

useSeoMeta({
  title: 'Booking Confirmed | SparkleClean Ireland',
  robots: 'noindex',
})

const config = useRuntimeConfig()
const lastBooking = ref<{
  id?: string
  pricing?: { total: number }
  emailSent?: boolean
} | null>(null)

onMounted(() => {
  const stored = sessionStorage.getItem('lastBooking')
  if (stored) {
    try {
      lastBooking.value = JSON.parse(stored)
    } catch {
      /* ignore */
    }
  }
})
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
    <div class="w-full max-w-lg text-center">
      <div
        class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
      >
        <CheckCircle2 class="h-10 w-10 text-emerald-600" />
      </div>

      <h1 class="text-3xl font-bold text-slate-900 sm:text-4xl">You're all set!</h1>
      <p class="mt-4 text-slate-600">
        Your booking request has been received. We'll review it and get back to you shortly.
      </p>

      <div
        v-if="lastBooking?.pricing"
        class="card mx-auto mt-8 text-left"
      >
        <p class="text-sm text-slate-500">Estimated total</p>
        <p class="text-2xl font-bold text-emerald-700">
          €{{ lastBooking.pricing.total }}
        </p>
        <p v-if="lastBooking.id" class="mt-2 text-xs text-slate-500">
          Reference: {{ lastBooking.id }}
        </p>
        <p class="mt-2 text-xs text-slate-500">
          Keep an eye on your email — we'll confirm your slot soon.
        </p>
      </div>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          :href="`mailto:${config.public.contactEmail}`"
          class="btn-primary"
        >
          <Mail class="h-4 w-4" />
          Email us
        </a>
        <NuxtLink to="/" class="btn-secondary">
          <Home class="h-4 w-4" />
          Back to Home
        </NuxtLink>
      </div>

      <NuxtLink
        to="/book"
        class="mt-6 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"
      >
        Book another clean
        <ArrowRight class="h-4 w-4" />
      </NuxtLink>
    </div>
  </div>
</template>
