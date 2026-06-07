export type ServiceType = 'standard' | 'deep'

export type HouseSize = 'studio' | '1bed' | '2bed' | '3bed' | '4bed'

export type AddonId = 'oven' | 'carpet' | 'windows'

export interface AddonOption {
  id: AddonId
  label: string
  description: string
  price: number
}

export interface HouseSizeOption {
  id: HouseSize
  label: string
  hours: number
}

export interface BookingForm {
  serviceType: ServiceType
  hours: number
  houseSize: HouseSize
  addons: AddonId[]
  date: string
  timeSlot: string
  name: string
  email: string
  phone: string
  eircode: string
  address: string
  notes: string
}

export interface PriceBreakdown {
  hourlyRate: number
  hours: number
  basePrice: number
  addonsTotal: number
  addonItems: { id: AddonId; label: string; price: number }[]
  total: number
}
