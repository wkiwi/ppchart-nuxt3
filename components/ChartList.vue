<script setup lang="ts">
import { DescData, Message } from "@arco-design/web-vue";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import Bus from "@/utils/bus";
import {
  Spin,
  Card,
  CardGrid,
  CardMeta,
  Pagination,
  Descriptions,
} from "@arco-design/web-vue";
import '@arco-design/web-vue/es/card/style/css.js'
import '@arco-design/web-vue/es/pagination/style/css.js'
import '@arco-design/web-vue/es/descriptions/style/css.js'
// import { os } from "@/utils/detect";
const isMobileApp = false //!os.desktop
const config = useRuntimeConfig()
const thumbnailBase = `${config.public.appOssBase}/chart-assets/ecg-storage/ec_gallery_thumbnail`;
const props = defineProps({
  type: String,
});

const chartData = reactive({
  chartList: [] as Array<{ title: string, thumbnailURL: string, cid: string, _desc: DescData[],code:string }>,
  total: 0,
  pageIndex: 1,
  loading: false,
});

const convertTime = (timeStr:Date) => {  
    let date = new Date(timeStr)
    let year = date.getFullYear() // 获取年
    let month = date.getMonth() + 1 // 获取月
    let day = date.getDate() // 获取日
    return  `${year}-${month<10?'0'+month:month}-${day<10?'0'+day:day}`
};
const { chartList } = useApi()
const  getData = async () => {
  chartData.loading = true;
  Bus.$emit("search-loading", true);
  const {data:dataInfo} = await chartList.getChartList({
    type: props.type,
    search: searchValue.value,
    current: chartData.pageIndex
  }) 
  Bus.$emit("search-loading", false);
  chartData.loading = false;
  if(!dataInfo.value){
    return
  }
  const {code, chartList:chartListData, total,message}= dataInfo.value
  
  if (code === 0) {
    chartData.chartList = chartListData.map((item: any) => {
      item.thumbnailURL = `${thumbnailBase}/${item.cid}.jpg`;      
      item._desc = [
        { value: convertTime(item.createtime), label: "创建时间" },
        { value: item.echartsVersion, label: "echart版本" },
        { value: item.viewCount, label: "浏览量" },
      ];
      chartData.total = total;
      return item;
    });
  } else {
    Message.error(message || "服务器开小差了，请稍后再试...");
  }
};

const searchValue = ref("");
onMounted(() => {
  getData();
  Bus.$on("search", ({ type: _type, searchValue: _searchValue }) => {
    searchValue.value = _searchValue;
    if (_type === props.type) {
      chartData.pageIndex = 1;
      getData();
    }
  });
});
onBeforeUnmount(() => {
  Bus.$off("search-loading");
});

const emits = defineEmits(["chartClick"]);

const chartClick = async (cid: string,code:string) => {
  emits("chartClick", {cid,code});
};
  
const pageChange = (pageIndex: number) => {
  chartData.pageIndex = pageIndex;
  getData();
};
</script>

<template>
  <div>
    <Spin style="width: 100%; min-height: 300px" :loading="chartData.loading" tip="加载中，请稍后...">
      <Card :bordered="false" :style="{ width: '100%', backgroundColor: 'var(--color-bg-5)' }">
        <CardGrid v-for="(item, index) in chartData.chartList" class="chart-card" :key="index" :style="{
          width: `${isMobileApp ? 'calc(100% - 16px)' : 'calc(20% - 16px)'}`,
          cursor: 'pointer',
          margin: '12px 8px',
          backgroundColor: 'var(--color-bg-2)',
        }">
          <Card hoverable :style="{ width: '100%' }" :title="item.title || '-'">
            <template #cover>
              <NuxtLink :to="'/detail/'+item.cid" target="_blank">
                <div :style="{ height: '175px', overflow: 'hidden' }" >
                  <img alt="dessert" :src="item.thumbnailURL" :style="{
                    width: '100%',
                    transform: 'translateY(-20px)',
                  }" />
                </div>
              </NuxtLink>
            </template>
            <CardMeta>
              <template #description>
                <NuxtLink :to="'/detail/'+item.cid" target="_blank">
                <Descriptions :data="item._desc" layout="inline-vertical" :column="3"
                  />
                </NuxtLink>
              </template>
            </CardMeta>
          </Card>
        </CardGrid>
      </Card>
    </Spin>
    <div class="pagination">
      <Pagination :total="chartData.total" show-total @change="pageChange" :disabled="chartData.loading"
        :page-size="20" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}

.chart-card {
  .arco-card-body {
    padding: 8px 8px 0 8px !important;
  }

  .arco-card-header {
    cursor: initial;
    padding: 0 16px;
    height: 36px;

    .arco-card-header-extra {
      cursor: pointer;
    }
  }
}
</style>
