import type { AddonId, BookingForm, HouseSize, ServiceType } from '~/types/booking'
import { pricingCatalog } from '../data/pricing'

const SERVICE_TYPES: ServiceType[] = ['standard', 'deep']
const HOUSE_SIZES: HouseSize[] = ['studio', '1bed', '2bed', '3bed', '4bed']
const ADDON_IDS = new Set(pricingCatalog.addons.map((a) => a.id))

const EIRCODE_RE = /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/i
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function parseBookingBody(body: unknown): BookingForm {
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' })
  }

  const raw = body as Record<string, unknown>

  const serviceType = raw.serviceType as ServiceType
  if (!SERVICE_TYPES.includes(serviceType)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid service type' })
  }

  const hours = Number(raw.hours)
  const minHours = pricingCatalog.pricing[serviceType].minHours
  if (!Number.isFinite(hours) || hours < minHours || hours > 10) {
    throw createError({
      statusCode: 400,
      statusMessage: `Hours must be between ${minHours} and 10`,
    })
  }

  const houseSize = raw.houseSize as HouseSize
  if (!HOUSE_SIZES.includes(houseSize)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid house size' })
  }

  const addons = Array.isArray(raw.addons)
    ? (raw.addons.filter((id): id is AddonId => typeof id === 'string' && ADDON_IDS.has(id as AddonId)) as AddonId[])
    : []

  const date = String(raw.date || '').trim()
  const timeSlot = String(raw.timeSlot || '').trim()
  if (!date || !timeSlot) {
    throw createError({ statusCode: 400, statusMessage: 'Date and time slot are required' })
  }
  if (!pricingCatalog.timeSlots.includes(timeSlot)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid time slot' })
  }

  const name = String(raw.name || '').trim()
  const email = String(raw.email || '').trim()
  const phone = String(raw.phone || '').trim()
  const eircode = String(raw.eircode || '').trim()
  const address = String(raw.address || '').trim()
  const notes = String(raw.notes || '').trim()

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Name is required' })
  }
  if (!EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Valid email is required' })
  }
  if (phone.replace(/\D/g, '').length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'Valid phone number is required' })
  }
  if (!EIRCODE_RE.test(eircode)) {
    throw createError({ statusCode: 400, statusMessage: 'Valid Eircode is required' })
  }

  return {
    serviceType,
    hours,
    houseSize,
    addons,
    date,
    timeSlot,
    name,
    email,
    phone,
    eircode,
    address,
    notes,
  }
}

export function calculateServerPrice(form: BookingForm) {
  const { hourlyRate, minHours, label } = pricingCatalog.pricing[form.serviceType]
  const billableHours = Math.max(form.hours, minHours)
  const basePrice = billableHours * hourlyRate

  const addonItems = pricingCatalog.addons
    .filter((a) => form.addons.includes(a.id))
    .map((a) => ({ id: a.id, label: a.label, price: a.price }))

  const addonsTotal = addonItems.reduce((sum, a) => sum + a.price, 0)

  return {
    serviceLabel: label,
    pricing: {
      hourlyRate,
      hours: billableHours,
      basePrice,
      addonsTotal,
      addonItems,
      total: basePrice + addonsTotal,
    },
  }
}
