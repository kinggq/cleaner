import type {
  AddonId,
  HouseSize,
  PriceBreakdown,
  PricingCatalog,
  ServiceType,
} from '~/types/booking'

const PRICING_KEY = 'pricing-catalog'

export function usePricing() {
  const { data: catalog, status, error } = useFetch<PricingCatalog>('/api/pricing', {
    key: PRICING_KEY,
  })

  const PRICING = computed(() => catalog.value?.pricing)
  const ADDONS = computed(() => catalog.value?.addons ?? [])
  const HOUSE_SIZES = computed(() => catalog.value?.houseSizes ?? [])
  const TIME_SLOTS = computed(() => catalog.value?.timeSlots ?? [])

  const formatEUR = (amount: number) =>
    new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)

  const getHourlyRate = (serviceType: ServiceType) =>
    catalog.value?.pricing[serviceType].hourlyRate ?? 0

  const getMinHours = (serviceType: ServiceType) =>
    catalog.value?.pricing[serviceType].minHours ?? 3

  const getHoursForHouseSize = (houseSize: HouseSize) =>
    HOUSE_SIZES.value.find((s) => s.id === houseSize)?.hours ?? getMinHours('standard')

  const fromPrice = computed(() => {
    const standard = catalog.value?.pricing.standard
    if (!standard) return 0
    return standard.hourlyRate * standard.minHours
  })

  const calculatePrice = (
    serviceType: ServiceType,
    hours: number,
    selectedAddons: AddonId[],
  ): PriceBreakdown => {
    const service = catalog.value?.pricing[serviceType]
    const hourlyRate = service?.hourlyRate ?? 0
    const minHours = service?.minHours ?? 3
    const billableHours = Math.max(hours, minHours)
    const basePrice = billableHours * hourlyRate

    const addonItems = ADDONS.value
      .filter((a) => selectedAddons.includes(a.id))
      .map((a) => ({
        id: a.id,
        label: a.label,
        price: a.price,
      }))

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
    catalog,
    status,
    error,
    formatEUR,
    getHourlyRate,
    getMinHours,
    getHoursForHouseSize,
    calculatePrice,
    isValidEircode,
    fromPrice,
    ADDONS,
    HOUSE_SIZES,
    TIME_SLOTS,
    PRICING,
  }
}
