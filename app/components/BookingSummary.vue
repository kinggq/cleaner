<script setup lang="ts">
import type { AddonId, ServiceType } from '~/types/booking'

const props = defineProps<{
  serviceType: ServiceType
  hours: number
  addons: AddonId[]
  date: string
  timeSlot: string
  compact?: boolean
}>()

const { calculatePrice, formatEUR, PRICING, getMinHours } = usePricing()

const pricing = computed(() =>
  calculatePrice(props.serviceType, props.hours, props.addons),
)

const serviceLabel = computed(
  () => PRICING.value?.[props.serviceType].label ?? props.serviceType,
)
</script>

<template>
  <aside
    class="card sticky top-24 border-emerald-100 bg-gradient-to-b from-white to-emerald-50/40"
    :class="compact ? '!p-4' : ''"
  >
    <h2 class="mb-4 text-lg font-bold text-slate-900">Booking Summary</h2>

    <dl class="space-y-3 text-sm">
      <div class="flex justify-between gap-4">
        <dt class="text-slate-500">Service</dt>
        <dd class="text-right font-medium text-slate-800">{{ serviceLabel }}</dd>
      </div>
      <div class="flex justify-between gap-4">
        <dt class="text-slate-500">Duration</dt>
        <dd class="font-medium text-slate-800">
          {{ pricing.hours }} hrs × {{ formatEUR(pricing.hourlyRate) }}
        </dd>
      </div>
      <div class="flex justify-between gap-4">
        <dt class="text-slate-500">Base price</dt>
        <dd class="font-medium text-slate-800">{{ formatEUR(pricing.basePrice) }}</dd>
      </div>

      <template v-if="pricing.addonItems.length">
        <div class="border-t border-slate-100 pt-3">
          <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Add-ons
          </p>
          <div
            v-for="addon in pricing.addonItems"
            :key="addon.id"
            class="flex justify-between gap-4 py-0.5"
          >
            <dt class="text-slate-500">{{ addon.label }}</dt>
            <dd class="font-medium text-slate-800">+{{ formatEUR(addon.price) }}</dd>
          </div>
        </div>
      </template>

      <template v-if="date && timeSlot">
        <div class="border-t border-slate-100 pt-3">
          <div class="flex justify-between gap-4">
            <dt class="text-slate-500">Date</dt>
            <dd class="font-medium text-slate-800">{{ date }}</dd>
          </div>
          <div class="mt-1 flex justify-between gap-4">
            <dt class="text-slate-500">Time</dt>
            <dd class="font-medium text-slate-800">{{ timeSlot }}</dd>
          </div>
        </div>
      </template>
    </dl>

    <div class="mt-5 flex items-end justify-between border-t border-emerald-100 pt-4">
      <span class="text-sm font-medium text-slate-600">Estimated total</span>
      <span class="text-2xl font-bold text-emerald-700">
        {{ formatEUR(pricing.total) }}
      </span>
    </div>

    <p v-if="!compact" class="mt-3 text-xs leading-relaxed text-slate-500">
      Final price may vary slightly based on property condition. Minimum
      {{ getMinHours('standard') }} hours applies to all standard bookings.
    </p>

    <slot />
  </aside>
</template>
