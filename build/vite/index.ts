/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-15 17:55:05
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-17 17:08:29
 */
import type { NuxtConfig } from '@nuxt/schema'
import { useEnv } from '../env'
import { createVitePlugins } from './plugins'

export function createViteConfig(): NuxtConfig['vite'] {
  const { viteEnv } = useEnv()
  return {
    ssr: {
      noExternal: ['@arco-design/web-vue'],
    },
    plugins: createVitePlugins(viteEnv),
  }
}
