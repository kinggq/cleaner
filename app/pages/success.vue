<script setup lang="ts">
import { ArrowRight, CheckCircle2, Home, MessageCircle } from '@lucide/vue'

useSeoMeta({
  title: 'Booking Confirmed | SparkleClean Ireland',
  robots: 'noindex',
})

const config = useRuntimeConfig()
const lastBooking = ref<{ pricing?: { total: number } } | null>(null)

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
        Your booking request has been sent via WhatsApp. We'll confirm your slot shortly.
      </p>

      <div
        v-if="lastBooking?.pricing"
        class="card mx-auto mt-8 text-left"
      >
        <p class="text-sm text-slate-500">Estimated total</p>
        <p class="text-2xl font-bold text-emerald-700">
          €{{ lastBooking.pricing.total }}
        </p>
        <p class="mt-2 text-xs text-slate-500">
          A confirmation message is on its way. Check WhatsApp for next steps.
        </p>
      </div>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          :href="`https://wa.me/${config.public.whatsappNumber}`"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary"
        >
          <MessageCircle class="h-4 w-4" />
          Open WhatsApp
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
