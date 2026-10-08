import type { PricingCatalog } from '~/types/booking'

/** Single source of truth for pricing — served via /api/pricing */
export const pricingCatalog: PricingCatalog = {
  pricing: {
    standard: {
      hourlyRate: 20,
      minHours: 3,
      label: 'Standard Cleaning',
      description: 'Regular home & apartment clean',
      teaser: 'Apartments & houses',
    },
    deep: {
      hourlyRate: 25,
      minHours: 3,
      label: 'Deep / End of Tenancy',
      description: 'Move-in, move-out & spring clean',
      teaser: 'End of tenancy',
    },
  },
  addons: [
    {
      id: 'oven',
      label: 'Oven Deep Clean',
      description: 'Full interior & exterior oven degrease',
      price: 50,
    },
    {
      id: 'carpet',
      label: 'Carpet Steam Clean',
      description: 'Hot water extraction for fresher carpets',
      price: 60,
    },
    {
      id: 'windows',
      label: 'Inside Windows',
      description: 'Streak-free interior window cleaning',
      price: 30,
    },
  ],
  houseSizes: [
    { id: 'studio', label: 'Studio / 1 Bed', hours: 3 },
    { id: '1bed', label: '1 Bedroom', hours: 3 },
    { id: '2bed', label: '2 Bedrooms', hours: 4 },
    { id: '3bed', label: '3 Bedrooms', hours: 5 },
    { id: '4bed', label: '4+ Bedrooms', hours: 6 },
  ],
  timeSlots: [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ],
}
