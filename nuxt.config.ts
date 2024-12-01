// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: false },
    modules: [
        'vuetify-nuxt-module',
        '@nuxt/eslint',
        '@pinia/nuxt',
        '@nuxtjs/eslint-module',
        '@nuxthub/core',
        '@nuxt/content',
        'nuxt-cloudflare-analytics',
    ],
    cloudflareAnalytics: {
        token: '97db8550f18d4cdda844ff8ab2199b36',
    },
})
