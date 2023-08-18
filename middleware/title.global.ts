/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-17 09:17:29
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-17 17:46:48
 */
// 全局路由中间件
// import { Message } from '@arco-design/web-vue'

export default defineNuxtRouteMiddleware((to, from) => {
  // 判断环境
  // if (process.client)
    // Message.info(`来自全局路由中间件${from.fullPath}->${to.fullPath}`)
  
  const { public: { appTitle,appKeyWords,appDescription } } = useRuntimeConfig()
  useHead({
    title: to.meta.title ? `${appTitle}-${to.meta.title}` : appTitle,
    meta: [
      { name: 'description', content: appDescription },
      { name: 'keywords', content: appKeyWords },
    ],
  })
})
