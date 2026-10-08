// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'SparkleClean Ireland | Professional Home Cleaning',
      meta: [
        {
          name: 'description',
          content:
            'Book trusted, fully insured home cleaning across Ireland. Standard & deep cleaning with eco-friendly products. Eircode coverage nationwide.',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    // Private — override via NUXT_* env vars
    notifyEmail: 'mayanping1030@gmail.com',
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPass: '',
    smtpFrom: '',
    public: {
      whatsappNumber: '353870042185',
      businessName: 'SparkleClean Ireland',
      contactEmail: 'mayanping1030@gmail.com',
    },
  },

  nitro: {
    experimental: {
      database: true,
    },
    database: {
      default: {
        connector: 'sqlite',
        options: { name: 'bookings' },
      },
    },
  },
})
