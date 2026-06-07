import type {
  AddonId,
  AddonOption,
  HouseSize,
  HouseSizeOption,
  PriceBreakdown,
  ServiceType,
} from '~/types/booking'

export const PRICING = {
  standard: { hourlyRate: 25, minHours: 3 },
  deep: { hourlyRate: 30, minHours: 3 },
} as const

export const ADDONS: AddonOption[] = [
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
]

export const HOUSE_SIZES: HouseSizeOption[] = [
  { id: 'studio', label: 'Studio / 1 Bed', hours: 3 },
  { id: '1bed', label: '1 Bedroom', hours: 3 },
  { id: '2bed', label: '2 Bedrooms', hours: 4 },
  { id: '3bed', label: '3 Bedrooms', hours: 5 },
  { id: '4bed', label: '4+ Bedrooms', hours: 6 },
]

export const TIME_SLOTS = [
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
]

export function usePricing() {
  const formatEUR = (amount: number) =>
    new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)

  const getHourlyRate = (serviceType: ServiceType) =>
    PRICING[serviceType].hourlyRate

  const getMinHours = (serviceType: ServiceType) =>
    PRICING[serviceType].minHours

  const getHoursForHouseSize = (houseSize: HouseSize) =>
    HOUSE_SIZES.find((s) => s.id === houseSize)?.hours ?? 3

  const calculatePrice = (
    serviceType: ServiceType,
    hours: number,
    selectedAddons: AddonId[],
  ): PriceBreakdown => {
    const { hourlyRate, minHours } = PRICING[serviceType]
    const billableHours = Math.max(hours, minHours)
    const basePrice = billableHours * hourlyRate

    const addonItems = ADDONS.filter((a) => selectedAddons.includes(a.id)).map(
      (a) => ({
        id: a.id,
        label: a.label,
        price: a.price,
      }),
    )

    const addonsTotal = addonItems.reduce((sum, a) => sum + a.price, 0)

    return {
      hourlyRate,
      hours: billableHours,
      basePrice,
      addonsTotal,
      addonItems,
      total: basePrice + addonsTotal,
    }
  }

  const isValidEircode = (eircode: string) =>
    /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/i.test(eircode.trim())

  return {
    formatEUR,
    getHourlyRate,
    getMinHours,
    getHoursForHouseSize,
    calculatePrice,
    isValidEircode,
    ADDONS,
    HOUSE_SIZES,
    TIME_SLOTS,
    PRICING,
  }
}
