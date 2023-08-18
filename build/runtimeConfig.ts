/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-15 17:55:05
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-18 15:43:25
 */
import type { NuxtConfig } from '@nuxt/schema'
import { useEnv } from './env'

export function createRuntimeConfig(): NuxtConfig['runtimeConfig'] {
  const { viteEnv } = useEnv()
  return {
    public: {
      port: viteEnv.PORT,
      apiBase: viteEnv.VITE_APP_BASE_URL,
      appTitle: viteEnv.VITE_APP_TITLE,
      appKeyWords: viteEnv.VITE_APP_KEY_WORDS,
      appDescription: viteEnv.VITE_APP_DESCRIPTION,
      appOssBase: viteEnv.VITE_APP_OSS_BASE,
    },
  }
}
