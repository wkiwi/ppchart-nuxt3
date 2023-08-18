<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-14 17:37:48
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-18 16:14:34
-->
<script lang="ts">
export default {
  name: 'index',
}
</script>
<script setup lang="ts">
import Bus from "@/utils/bus";
import {reactive,ref,onMounted} from "vue"
const props = defineProps({
  searchData: String,
});
const tabData = reactive({ currentType: "全部" });
const tabChange = (typeName: string) => {
  const tabItem = categoryList.value.find((item) => item.name === typeName);
  if (tabItem) tabItem.show = true;
};
const categoryList = ref([
  ...CHART_TYPE_ALL.map((name, index) => ({
    type: `${index + 1}`,
    show: !index,
    name,
  })),
]);
const { chartList } = useApi()
const chartListData = ref()
async function getChartList() {
  const {data} = await chartList.getChartList({
    type:   1,
    search: '',
    current: 1
  })
  chartListData.value = data
}
const chartDetail = reactive({
  visible: false,
  cid: '',
  code:'',
  handleOk: () => {
    chartDetail.visible = false;
  },
});
const chartClick = (data:any) => {
  chartDetail.cid = data.cid;
  chartDetail.code = data.code
  chartDetail.visible = true;
};
onMounted(()=>{
  Bus.$on("home-search", (searchValue) => {
    const tabItem:any = categoryList.value.find((item) => item.name === tabData.currentType)
    Bus.$emit("search", { type: tabItem.type, searchValue });
  });
  getChartList()
})
</script>

<template>
  <div class="index">
    <ChartTypeGroup v-model="tabData.currentType" @change="tabChange"/>
    <template v-for="item in categoryList">
      <div v-if="item.show" :key="item.type">
        <ChartList v-show="item.name === tabData.currentType" :type="item.type" :searchData="props.searchData"
          @chartClick="chartClick"></ChartList>
      </div>
    </template>
  </div>
</template>

<style>
.index{
  padding:20px 30px;
  min-height: calc(100vh - 61px);
}
</style>