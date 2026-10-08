<script setup lang="ts">
import { Mail, Menu, Phone, Sparkles, X } from '@lucide/vue'

const config = useRuntimeConfig()
const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Book Now', to: '/book' },
]

watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false
  },
)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm"
          >
            <Sparkles class="h-5 w-5" />
          </span>
          <div>
            <p class="text-sm font-bold leading-tight text-slate-900">
              {{ config.public.businessName }}
            </p>
            <p class="text-xs text-slate-500">Professional Cleaning · Ireland</p>
          </div>
        </NuxtLink>

        <nav class="hidden items-center gap-8 md:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
            active-class="!text-emerald-700"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink to="/book" class="btn-primary !py-2.5 !text-sm">
            Book a Clean
          </NuxtLink>
        </nav>

        <button
          type="button"
          class="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <X v-if="mobileMenuOpen" class="h-6 w-6" />
          <Menu v-else class="h-6 w-6" />
        </button>
      </div>

      <div
        v-if="mobileMenuOpen"
        class="border-t border-slate-100 bg-white px-4 py-4 md:hidden"
      >
        <nav class="flex flex-col gap-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink to="/book" class="btn-primary mt-1 w-full">
            Book a Clean
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div class="mb-4 flex items-center gap-2">
              <Sparkles class="h-5 w-5 text-emerald-400" />
              <span class="font-semibold text-white">{{ config.public.businessName }}</span>
            </div>
            <p class="text-sm leading-relaxed text-slate-400">
              Trusted home cleaning across Ireland. Fully insured, eco-friendly products,
              and reliable Eircode-based service.
            </p>
          </div>

          <div>
            <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul class="space-y-2 text-sm">
              <li>
                <NuxtLink to="/" class="hover:text-emerald-400">Home</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/book" class="hover:text-emerald-400">Book a Clean</NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <a
              :href="`mailto:${config.public.contactEmail}`"
              class="inline-flex items-center gap-2 text-sm hover:text-emerald-400"
            >
              <Mail class="h-4 w-4" />
              {{ config.public.contactEmail }}
            </a>
            <a
              :href="`https://wa.me/${config.public.whatsappNumber}`"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-2 inline-flex items-center gap-2 text-sm hover:text-emerald-400"
            >
              <Phone class="h-4 w-4" />
              WhatsApp Us
            </a>
            <p class="mt-3 text-xs text-slate-500">
              Serving Dublin, Cork, Galway & nationwide via Eircode
            </p>
          </div>
        </div>

        <div
          class="mt-10 flex flex-col items-center justify-between gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row"
        >
          <p>© {{ new Date().getFullYear() }} {{ config.public.businessName }}. All rights reserved.</p>
          <p>Fully insured · Eco-friendly products</p>
        </div>
      </div>
    </footer>
  </div>
</template>
