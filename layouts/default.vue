<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-17 09:37:37
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-17 17:41:47
-->
<script lang="ts" setup>

// const router = useRouter()
// const navList = ref()

// const routerList = router.getRoutes().map(item => ({ to: item.path, name: item.meta.title ?? item.name })).reverse()
// navList.value = routerList

</script>

<template>
  <div class="mx-auto  content">
    <Header />
    <slot />
  </div>
</template>

<style scoped>
.content{
  padding-top: 61px;
  background-color: var(--color-bg-2);
}
</style>
