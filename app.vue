<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-11 18:00:11
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-17 17:44:31
-->

<script setup>
import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/notification/style/css.js'

const { key } = useFixApp()

</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <!-- 路由出口 -->
    <NuxtPage :key="key" />
  </NuxtLayout>
</template>
<style lang="scss">
html,
body {
  height: 100%;
  --color-logo: rgb(85, 26, 139);
  --color-logo-1: rgb(237, 221, 249);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.arco-modal-body {
  padding: 0 20px !important;
  overflow: hidden !important;
}

.content {
  background-color: var(--color-bg-5);

  // .arco-card-meta-title {
  //   margin: 8px 0 8px 0;
  //   font-size: 18px;
  // }
}


body[arco-theme="dark"] {
  --color-logo: var(--color-text-1);
  --color-logo-1: var(--color-bg-5);
}

</style>