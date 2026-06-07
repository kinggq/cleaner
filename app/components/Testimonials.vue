<script setup lang="ts">
import { Quote, Star } from '@lucide/vue'

const testimonials = [
  {
    name: 'Sarah O\'Brien',
    location: 'Dublin 4',
    rating: 5,
    text:
      'Absolutely spotless after our end-of-tenancy clean. They arrived on time, used lovely eco products, and the deposit was returned in full.',
  },
  {
    name: 'James Murphy',
    location: 'Cork',
    rating: 5,
    text:
      'Booked via phone in two minutes. Transparent pricing, no surprises. Our 3-bed house has never looked better.',
  },
  {
    name: 'Aoife Kelly',
    location: 'Galway',
    rating: 5,
    text:
      'Reliable weekly standard clean. Friendly team, fully insured, and they always confirm via WhatsApp the day before.',
  },
]
</script>

<template>
  <section class="bg-white py-16 sm:py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="mb-10 text-center">
        <p class="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Customer Reviews
        </p>
        <h2 class="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Loved by Irish homeowners
        </h2>
        <p class="mx-auto mt-3 max-w-2xl text-slate-600">
          Real feedback from clients across Dublin, Cork, and Galway.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="item in testimonials"
          :key="item.name"
          class="card relative flex flex-col"
        >
          <Quote class="absolute right-5 top-5 h-8 w-8 text-emerald-100" />
          <div class="mb-3 flex gap-0.5">
            <Star
              v-for="n in item.rating"
              :key="n"
              class="h-4 w-4 fill-amber-400 text-amber-400"
            />
          </div>
          <p class="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
            "{{ item.text }}"
          </p>
          <div>
            <p class="font-semibold text-slate-900">{{ item.name }}</p>
            <p class="text-xs text-slate-500">{{ item.location }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
