/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-15 17:55:05
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-17 16:49:28
 */
import type { PluginOption } from 'vite'
import { createCompression } from './compression'
import { createComponents } from './components'
import { createIcons } from './icons'

export function createVitePlugins(viteEnv: ViteEnv) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // 组件按需导入
    createComponents(),
    createIcons(),
  ]
  // gzip压缩插件
  vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
