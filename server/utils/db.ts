let initialized = false

export async function useBookingsDb() {
  const db = useDatabase()

  if (!initialized) {
    await db.sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        service_type TEXT NOT NULL,
        hours INTEGER NOT NULL,
        house_size TEXT NOT NULL,
        addons TEXT NOT NULL,
        date TEXT NOT NULL,
        time_slot TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        eircode TEXT NOT NULL,
        address TEXT,
        notes TEXT,
        hourly_rate INTEGER NOT NULL,
        base_price INTEGER NOT NULL,
        addons_total INTEGER NOT NULL,
        total INTEGER NOT NULL,
        addon_items TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `
    initialized = true
  }

  return db
}
