/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-11 18:00:11
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-18 15:42:09
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
import { createRuntimeConfig, createViteConfig } from './build'

export default defineNuxtConfig({
  devtools: { enabled: true },
  // pages:'pages',
  // components:'components',
  // meta: {
  //   meta: [
  //     // <meta name="viewport" content="width=device-width, initial-scale=1">
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  //   ],
  //   script: [
  //     // <script src="https://myawesome-lib.js"></script>
  //     { src: 'https://awesome-lib.js' }
  //   ],
  //   link: [
  //     // <link rel="stylesheet" href="https://myawesome-lib.css">
  //     { rel: 'stylesheet', href: 'https://awesome-lib.css' }
  //   ],
  //   // 请注意，这是一个可能会发生变化的区域
  //   style: [
  //     // <style type="text/css">:root { color: red }</style>
  //     { children: ':root { color: red }', type: 'text/css' }
  //   ]
  // },
  modules: [
    '@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt', 'nuxt-lodash', '@pinia-plugin-persistedstate/nuxt',
  ],
  css: ['assets/css/index.css'],
  runtimeConfig: createRuntimeConfig(),
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    keepalive: true,
  },
  typescript: {
    shim: false,
    strict: true,
  },
  experimental: {
    reactivityTransform: true,
    typedPages: true,
  },
   vite: createViteConfig(),
})
