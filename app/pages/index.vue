<script setup lang="ts">
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Clock,
  Star,
} from '@lucide/vue'

useSeoMeta({
  title: 'SparkleClean Ireland | Book Professional Home Cleaning',
  description:
    'Mobile-first booking for trusted Irish home cleaning. Fully insured, eco-friendly, Eircode coverage. From €75.',
})

const features = [
  {
    icon: ShieldCheck,
    title: 'Fully Insured',
    description:
      'Every cleaner is vetted, trained, and covered for your complete peace of mind.',
  },
  {
    icon: MapPin,
    title: 'Eircode Coverage',
    description:
      'We service homes across Ireland — just enter your Eircode when booking.',
  },
  {
    icon: Leaf,
    title: 'Eco-friendly Products',
    description:
      'Safe, non-toxic cleaning products that are gentle on your family and pets.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description:
      'Morning and afternoon slots, 7 days a week. Book in under 2 minutes.',
  },
]

const steps = [
  { step: '1', title: 'Choose your service', desc: 'Standard or deep clean, pick your hours.' },
  { step: '2', title: 'Add extras', desc: 'Oven, carpets, or windows — optional add-ons.' },
  { step: '3', title: 'Pick a time', desc: 'Select date & slot that suits you.' },
  { step: '4', title: 'Confirm via WhatsApp', desc: 'We confirm instantly — no phone tag.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 text-white">
      <div
        class="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        class="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl"
      />

      <div class="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
        <div class="max-w-2xl">
          <div
            class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
          >
            <Star class="h-4 w-4 fill-amber-300 text-amber-300" />
            Rated 5★ by Irish homeowners
          </div>

          <h1 class="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            A spotless home,
            <span class="text-emerald-200">booked in minutes</span>
          </h1>

          <p class="mt-5 max-w-xl text-lg leading-relaxed text-emerald-100">
            Professional cleaning across Ireland. Fully insured teams, eco-friendly products,
            and transparent pricing from <strong class="text-white">€25/hr</strong>.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <NuxtLink
              to="/book"
              class="btn-primary !bg-white !text-emerald-800 hover:!bg-emerald-50 !px-8 !py-4 !text-base"
            >
              Book a Clean
              <ArrowRight class="h-5 w-5" />
            </NuxtLink>
            <p class="text-sm text-emerald-200">
              From €75 · Min. 3 hours · No hidden fees
            </p>
          </div>

          <ul class="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-emerald-100">
            <li class="flex items-center gap-2">
              <CheckCircle2 class="h-4 w-4 text-emerald-300" />
              Fully Insured
            </li>
            <li class="flex items-center gap-2">
              <CheckCircle2 class="h-4 w-4 text-emerald-300" />
              Eircode Coverage
            </li>
            <li class="flex items-center gap-2">
              <CheckCircle2 class="h-4 w-4 text-emerald-300" />
              Eco-friendly
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing teaser -->
    <section class="border-b border-slate-200 bg-white py-10">
      <div class="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
          <p class="text-2xl font-bold text-emerald-700">€25/hr</p>
          <p class="mt-1 text-sm font-medium text-slate-700">Standard Cleaning</p>
          <p class="text-xs text-slate-500">Apartments & houses</p>
        </div>
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
          <p class="text-2xl font-bold text-emerald-700">€30/hr</p>
          <p class="mt-1 text-sm font-medium text-slate-700">Deep Cleaning</p>
          <p class="text-xs text-slate-500">End of tenancy</p>
        </div>
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
          <p class="text-2xl font-bold text-emerald-700">+€50</p>
          <p class="mt-1 text-sm font-medium text-slate-700">Oven Deep Clean</p>
        </div>
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
          <p class="text-2xl font-bold text-emerald-700">+€60</p>
          <p class="mt-1 text-sm font-medium text-slate-700">Carpet Steam</p>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 sm:py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="mb-12 text-center">
          <p class="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Why choose us
          </p>
          <h2 class="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Cleaning you can trust
          </h2>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="feature in features"
            :key="feature.title"
            class="card group transition hover:border-emerald-200 hover:shadow-md"
          >
            <div
              class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white"
            >
              <component :is="feature.icon" class="h-6 w-6" />
            </div>
            <h3 class="mb-2 font-semibold text-slate-900">{{ feature.title }}</h3>
            <p class="text-sm leading-relaxed text-slate-600">{{ feature.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-slate-100 py-16 sm:py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl">How it works</h2>
          <p class="mt-3 text-slate-600">Four simple steps — optimised for mobile booking</p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="item in steps"
            :key="item.step"
            class="relative rounded-2xl bg-white p-6 shadow-sm"
          >
            <span
              class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white"
            >
              {{ item.step }}
            </span>
            <h3 class="font-semibold text-slate-900">{{ item.title }}</h3>
            <p class="mt-2 text-sm text-slate-600">{{ item.desc }}</p>
          </div>
        </div>

        <div class="mt-10 text-center">
          <NuxtLink to="/book" class="btn-primary">
            <Sparkles class="h-4 w-4" />
            Start Your Booking
          </NuxtLink>
        </div>
      </div>
    </section>

    <Testimonials />

    <!-- Final CTA -->
    <section class="bg-emerald-700 py-14 text-white">
      <div class="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 class="text-3xl font-bold sm:text-4xl">Ready for a cleaner home?</h2>
        <p class="mx-auto mt-3 max-w-lg text-emerald-100">
          Book online now and we'll confirm your slot via WhatsApp within minutes.
        </p>
        <NuxtLink
          to="/book"
          class="btn-primary mt-8 !bg-white !text-emerald-800 hover:!bg-emerald-50"
        >
          Book a Clean — It's Free to Quote
          <ArrowRight class="h-5 w-5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
