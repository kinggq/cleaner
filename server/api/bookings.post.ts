import { randomUUID } from 'node:crypto'
import { calculateServerPrice, parseBookingBody } from '../utils/booking'
import { useBookingsDb } from '../utils/db'
import { sendBookingNotification } from '../utils/mail'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const form = parseBookingBody(body)
  const { serviceLabel, pricing } = calculateServerPrice(form)

  const id = randomUUID()
  const createdAt = new Date().toISOString()
  const db = await useBookingsDb()

  await db.sql`
    INSERT INTO bookings (
      id, service_type, hours, house_size, addons,
      date, time_slot, name, email, phone, eircode, address, notes,
      hourly_rate, base_price, addons_total, total, addon_items, created_at
    ) VALUES (
      ${id},
      ${form.serviceType},
      ${form.hours},
      ${form.houseSize},
      ${JSON.stringify(form.addons)},
      ${form.date},
      ${form.timeSlot},
      ${form.name},
      ${form.email},
      ${form.phone},
      ${form.eircode.toUpperCase()},
      ${form.address || null},
      ${form.notes || null},
      ${pricing.hourlyRate},
      ${pricing.basePrice},
      ${pricing.addonsTotal},
      ${pricing.total},
      ${JSON.stringify(pricing.addonItems)},
      ${createdAt}
    )
  `

  let emailSent = false
  try {
    const result = await sendBookingNotification({ id, form, pricing, serviceLabel })
    emailSent = result.sent
  } catch (err) {
    console.error('[bookings] Failed to send notification email', err)
  }

  setResponseStatus(event, 201)
  return {
    id,
    pricing,
    emailSent,
    createdAt,
  }
})
