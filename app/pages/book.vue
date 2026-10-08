<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Home,
  Loader2,
  Sparkles,
} from '@lucide/vue'
import type { AddonId, BookingForm, HouseSize, ServiceType } from '~/types/booking'

useSeoMeta({
  title: 'Book a Clean | SparkleClean Ireland',
  description: 'Book standard or deep cleaning online. Real-time pricing, Eircode booking, instant confirmation.',
})

const {
  formatEUR,
  getMinHours,
  getHoursForHouseSize,
  calculatePrice,
  isValidEircode,
  ADDONS,
  HOUSE_SIZES,
  TIME_SLOTS,
  PRICING,
} = usePricing()

const { submitBooking, submitting, submitError } = useBookingSubmit()

const currentStep = ref(1)
const totalSteps = 4
const errors = ref<Record<string, string>>({})

const form = ref<BookingForm>({
  serviceType: 'standard',
  hours: 3,
  houseSize: '2bed',
  addons: [],
  date: '',
  timeSlot: '',
  name: '',
  email: '',
  phone: '',
  eircode: '',
  address: '',
  notes: '',
})

const pricing = computed(() =>
  calculatePrice(form.value.serviceType, form.value.hours, form.value.addons),
)

const minDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
})

const stepLabels = ['Service', 'Add-ons', 'Schedule', 'Details']

const progress = computed(() => ((currentStep.value - 1) / (totalSteps - 1)) * 100)

function selectService(type: ServiceType) {
  form.value.serviceType = type
  const min = getMinHours(type)
  if (form.value.hours < min) form.value.hours = min
}

function selectHouseSize(size: HouseSize) {
  form.value.houseSize = size
  form.value.hours = getHoursForHouseSize(size)
}

function toggleAddon(id: AddonId) {
  const idx = form.value.addons.indexOf(id)
  if (idx === -1) form.value.addons.push(id)
  else form.value.addons.splice(idx, 1)
}

function validateStep(step: number): boolean {
  errors.value = {}

  if (step === 1) {
    if (form.value.hours < getMinHours(form.value.serviceType)) {
      errors.value.hours = `Minimum ${getMinHours(form.value.serviceType)} hours required`
      return false
    }
  }

  if (step === 3) {
    if (!form.value.date) {
      errors.value.date = 'Please select a date'
      return false
    }
    if (!form.value.timeSlot) {
      errors.value.timeSlot = 'Please select a time slot'
      return false
    }
  }

  if (step === 4) {
    if (!form.value.name.trim()) errors.value.name = 'Name is required'
    if (!form.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
      errors.value.email = 'Valid email is required'
    }
    if (!form.value.phone.trim() || form.value.phone.replace(/\D/g, '').length < 8) {
      errors.value.phone = 'Valid Irish phone number required'
    }
    if (!isValidEircode(form.value.eircode)) {
      errors.value.eircode = 'Enter a valid Eircode (e.g. D02 X285)'
    }
    return Object.keys(errors.value).length === 0
  }

  return true
}

function nextStep() {
  if (!validateStep(currentStep.value)) return
  if (currentStep.value < totalSteps) currentStep.value++
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

async function handleSubmit() {
  if (submitting.value) return
  if (!validateStep(4)) return
  await submitBooking(form.value)
}

watch(
  () => form.value.houseSize,
  (size) => {
    form.value.hours = getHoursForHouseSize(size)
  },
)
</script>

<template>
  <div class="bg-slate-50 py-8 sm:py-12">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink
          to="/"
          class="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft class="h-4 w-4" />
          Back to home
        </NuxtLink>
        <h1 class="text-3xl font-bold text-slate-900 sm:text-4xl">Book your clean</h1>
        <p class="mt-2 text-slate-600">
          Transparent pricing · Instant booking · Fully insured
        </p>
      </div>

      <!-- Progress bar -->
      <div class="mb-8">
        <div class="mb-3 flex justify-between text-xs font-medium text-slate-500">
          <span
            v-for="(label, i) in stepLabels"
            :key="label"
            :class="currentStep >= i + 1 ? 'text-emerald-700' : ''"
          >
            <span class="hidden sm:inline">{{ i + 1 }}. </span>{{ label }}
          </span>
        </div>
        <div class="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            class="h-full rounded-full bg-emerald-600 transition-all duration-300"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-[1fr_340px]">
        <!-- Form -->
        <div class="card">
          <!-- Step 1: Service -->
          <section v-show="currentStep === 1">
            <div class="mb-6 flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Home class="h-5 w-5" />
              </span>
              <div>
                <h2 class="text-xl font-bold text-slate-900">Choose your service</h2>
                <p class="text-sm text-slate-500">Select cleaning type and estimated duration</p>
              </div>
            </div>

            <div class="mb-6 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                class="rounded-2xl border-2 p-5 text-left transition"
                :class="
                  form.serviceType === 'standard'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-200'
                "
                @click="selectService('standard')"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <p class="font-semibold text-slate-900">{{ PRICING?.standard.label }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ PRICING?.standard.description }}</p>
                  </div>
                  <Check
                    v-if="form.serviceType === 'standard'"
                    class="h-5 w-5 shrink-0 text-emerald-600"
                  />
                </div>
                <p class="mt-3 text-lg font-bold text-emerald-700">
                  {{ formatEUR(PRICING?.standard.hourlyRate ?? 0) }}/hr
                </p>
                <p class="text-xs text-slate-500">Min. {{ PRICING?.standard.minHours }} hours</p>
              </button>

              <button
                type="button"
                class="rounded-2xl border-2 p-5 text-left transition"
                :class="
                  form.serviceType === 'deep'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-200'
                "
                @click="selectService('deep')"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <p class="font-semibold text-slate-900">{{ PRICING?.deep.label }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ PRICING?.deep.description }}</p>
                  </div>
                  <Check
                    v-if="form.serviceType === 'deep'"
                    class="h-5 w-5 shrink-0 text-emerald-600"
                  />
                </div>
                <p class="mt-3 text-lg font-bold text-emerald-700">
                  {{ formatEUR(PRICING?.deep.hourlyRate ?? 0) }}/hr
                </p>
                <p class="text-xs text-slate-500">Min. {{ PRICING?.deep.minHours }} hours</p>
              </button>
            </div>

            <div class="mb-6">
              <label class="label">Property size (auto-estimates hours)</label>
              <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <button
                  v-for="size in HOUSE_SIZES"
                  :key="size.id"
                  type="button"
                  class="rounded-xl border px-3 py-2.5 text-sm font-medium transition"
                  :class="
                    form.houseSize === size.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 text-slate-600 hover:border-emerald-200'
                  "
                  @click="selectHouseSize(size.id)"
                >
                  {{ size.label }}
                  <span class="block text-xs font-normal text-slate-500">{{ size.hours }}h</span>
                </button>
              </div>
            </div>

            <div>
              <label for="hours" class="label">
                Estimated hours
                <span class="font-normal text-slate-400">(min. {{ getMinHours(form.serviceType) }})</span>
              </label>
              <div class="flex items-center gap-4">
                <input
                  id="hours"
                  v-model.number="form.hours"
                  type="range"
                  :min="getMinHours(form.serviceType)"
                  max="10"
                  step="1"
                  class="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-600"
                />
                <span class="w-16 rounded-xl bg-emerald-50 px-3 py-2 text-center font-bold text-emerald-700">
                  {{ form.hours }}h
                </span>
              </div>
              <p v-if="errors.hours" class="mt-1 text-xs text-red-600">{{ errors.hours }}</p>
            </div>
          </section>

          <!-- Step 2: Add-ons -->
          <section v-show="currentStep === 2">
            <div class="mb-6 flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Sparkles class="h-5 w-5" />
              </span>
              <div>
                <h2 class="text-xl font-bold text-slate-900">Optional add-ons</h2>
                <p class="text-sm text-slate-500">Enhance your clean with popular extras</p>
              </div>
            </div>

            <div class="space-y-3">
              <label
                v-for="addon in ADDONS"
                :key="addon.id"
                class="flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-4 transition"
                :class="
                  form.addons.includes(addon.id)
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-200'
                "
              >
                <input
                  type="checkbox"
                  class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  :checked="form.addons.includes(addon.id)"
                  @change="toggleAddon(addon.id)"
                />
                <div class="flex-1">
                  <div class="flex items-center justify-between gap-2">
                    <p class="font-semibold text-slate-900">{{ addon.label }}</p>
                    <span class="font-bold text-emerald-700">+{{ formatEUR(addon.price) }}</span>
                  </div>
                  <p class="mt-1 text-sm text-slate-500">{{ addon.description }}</p>
                </div>
              </label>
            </div>

            <p class="mt-4 text-sm text-slate-500">
              No add-ons needed? Simply continue to scheduling.
            </p>
          </section>

          <!-- Step 3: Schedule -->
          <section v-show="currentStep === 3">
            <div class="mb-6 flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Calendar class="h-5 w-5" />
              </span>
              <div>
                <h2 class="text-xl font-bold text-slate-900">Pick date & time</h2>
                <p class="text-sm text-slate-500">We'll confirm availability by email shortly</p>
              </div>
            </div>

            <div class="grid gap-6 sm:grid-cols-2">
              <div>
                <label for="date" class="label">Preferred date</label>
                <input
                  id="date"
                  v-model="form.date"
                  type="date"
                  :min="minDate"
                  class="input-field"
                />
                <p v-if="errors.date" class="mt-1 text-xs text-red-600">{{ errors.date }}</p>
              </div>

              <div>
                <label class="label">Time slot</label>
                <div class="grid grid-cols-3 gap-2 sm:grid-cols-2">
                  <button
                    v-for="slot in TIME_SLOTS"
                    :key="slot"
                    type="button"
                    class="rounded-xl border px-3 py-2.5 text-sm font-medium transition"
                    :class="
                      form.timeSlot === slot
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 text-slate-600 hover:border-emerald-200'
                    "
                    @click="form.timeSlot = slot"
                  >
                    {{ slot }}
                  </button>
                </div>
                <p v-if="errors.timeSlot" class="mt-1 text-xs text-red-600">{{ errors.timeSlot }}</p>
              </div>
            </div>
          </section>

          <!-- Step 4: Contact -->
          <section v-show="currentStep === 4">
            <div class="mb-6 flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <MessageCircle class="h-5 w-5" />
              </span>
              <div>
                <h2 class="text-xl font-bold text-slate-900">Your details</h2>
                <p class="text-sm text-slate-500">We'll use your Eircode to confirm coverage</p>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="name" class="label">Full name *</label>
                <input id="name" v-model="form.name" type="text" class="input-field" placeholder="Sarah O'Brien" />
                <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
              </div>
              <div>
                <label for="phone" class="label">Phone *</label>
                <input id="phone" v-model="form.phone" type="tel" class="input-field" placeholder="085 123 4567" />
                <p v-if="errors.phone" class="mt-1 text-xs text-red-600">{{ errors.phone }}</p>
              </div>
              <div class="sm:col-span-2">
                <label for="email" class="label">Email *</label>
                <input id="email" v-model="form.email" type="email" class="input-field" placeholder="sarah@email.com" />
                <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
              </div>
              <div>
                <label for="eircode" class="label">Eircode *</label>
                <input
                  id="eircode"
                  v-model="form.eircode"
                  type="text"
                  class="input-field uppercase"
                  placeholder="D02 X285"
                  maxlength="8"
                />
                <p v-if="errors.eircode" class="mt-1 text-xs text-red-600">{{ errors.eircode }}</p>
              </div>
              <div>
                <label for="address" class="label">Address (optional)</label>
                <input id="address" v-model="form.address" type="text" class="input-field" placeholder="12 Grafton Street" />
              </div>
              <div class="sm:col-span-2">
                <label for="notes" class="label">Special instructions (optional)</label>
                <textarea
                  id="notes"
                  v-model="form.notes"
                  rows="3"
                  class="input-field resize-none"
                  placeholder="Access codes, pets, areas to focus on..."
                />
              </div>
            </div>
          </section>

          <!-- Navigation -->
          <div class="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
            <button
              v-if="currentStep > 1"
              type="button"
              class="btn-secondary"
              @click="prevStep"
            >
              <ArrowLeft class="h-4 w-4" />
              Back
            </button>
            <div v-else />

            <button
              v-if="currentStep < totalSteps"
              type="button"
              class="btn-primary sm:ml-auto"
              @click="nextStep"
            >
              Continue
              <ArrowRight class="h-4 w-4" />
            </button>

            <button
              v-else
              type="button"
              class="btn-primary sm:ml-auto"
              :disabled="submitting"
              @click="handleSubmit"
            >
              <Loader2 v-if="submitting" class="h-4 w-4 animate-spin" />
              <Check v-else class="h-4 w-4" />
              {{ submitting ? 'Submitting…' : 'Confirm booking' }}
            </button>
          </div>

          <p v-if="submitError" class="mt-4 text-sm text-red-600">{{ submitError }}</p>
        </div>

        <!-- Sidebar summary (desktop) -->
        <div class="hidden lg:block">
          <BookingSummary
            :service-type="form.serviceType"
            :hours="form.hours"
            :addons="form.addons"
            :date="form.date"
            :time-slot="form.timeSlot"
          />
        </div>
      </div>

      <!-- Mobile sticky summary -->
      <div
        class="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 p-4 backdrop-blur-md lg:hidden"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-500">Estimated total</p>
            <p class="text-xl font-bold text-emerald-700">{{ formatEUR(pricing.total) }}</p>
          </div>
          <button
            v-if="currentStep < totalSteps"
            type="button"
            class="btn-primary !py-2.5"
            @click="nextStep"
          >
            Continue
          </button>
          <button
            v-else
            type="button"
            class="btn-primary !py-2.5"
            :disabled="submitting"
            @click="handleSubmit"
          >
            {{ submitting ? 'Submitting…' : 'Confirm' }}
          </button>
        </div>
      </div>

      <!-- Spacer for mobile sticky bar -->
      <div class="h-20 lg:hidden" />
    </div>
  </div>
</template>
