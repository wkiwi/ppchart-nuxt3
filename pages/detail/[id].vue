<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-14 17:38:25
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-18 15:11:20
-->

<script lang="ts" setup>
const route = useRoute();
const { chartDetail } = useApi()
const chartDetailInfo = ref()
async function getChartDetail() {
  const {data} = await chartDetail.getChartDetail({
    cid: route.params.id,
  })
  chartDetailInfo.value = data  
}
onMounted(()=>{
  getChartDetail()
})
</script>
<template>
  <div class="detail">
    <ChartDetail :cid="$route.params.id"/>
  </div>
</template>

<style>
.detail{
  height:calc(100vh - 61px);
  overflow: hidden;
}
</style>
