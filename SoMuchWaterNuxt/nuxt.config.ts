// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', 'nuxt-security'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  security:{
    corsHandler:{
      origin: ["http://127.0.0.1:8000"]
    },
    headers:{
      contentSecurityPolicy:{
        "img-src":["https://upload.wikimedia.org/","https://live.staticflickr.com/","'self'","data:"]
      }
    }
  }
})