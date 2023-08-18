<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-10 17:49:21
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-18 16:14:41
-->
<template>
  <div class='chart-detail'>
    <div class="code-left">
      <div class="handle-group">
        <Space size='large'>
          <Button type='primary' @click="formatCode">格式化</Button>
          <Button type='primary' @click="runCode">运行</Button>
        </Space>
      </div>
        <div class="code-container">
          <ClientOnly>
            <MonocoInit v-model:textValue="textValue" ref="monocoInit"></MonocoInit>
          </ClientOnly>
      </div>
    </div>
    <div class="chart-right">
      <div class="chart-version">
        <Select :style="{width:'140px'}" placeholder="请选择Echarts版本" v-model="currentVersion" @change="changeVersion">
          <Option v-for="(item,index) in echartsVersions" :key="index">{{item}}</Option>
        </Select>
        <span style="padding-left: 10px;color: var(--color-logo);">推荐版本: {{chartData.echartsVersion}}</span>
      </div>
      <div class="chart-container" ref="chartContainer" id="chartContainer">

      </div>
      <Spin dot  :loading="chartData.loading" v-if="chartData.loading" tip="生成中..."/>
    </div>

  </div>
</template>
<script setup lang="ts">
import { onMounted, ref,reactive,nextTick} from '@vue/runtime-core'
import { Button, Space ,Select,Message,Option,Spin} from '@arco-design/web-vue';
import '@arco-design/web-vue/es/button/style/css.js'
import '@arco-design/web-vue/es/space/style/css.js'
import '@arco-design/web-vue/es/select/style/css.js'
import '@arco-design/web-vue/es/spin/style/css.js'
import Bus from "@/utils/bus";
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  cid: {
    type: String,
    default: '',
  },
})
onMounted(()=>{
  nextTick(() => {
    getData()
  })
})
const textValue = ref('')
const echartsVersions = ref([
    "5.3.1-rc.1",
    "5.3.0",
    "5.3.0-rc.1",
    "5.2.2",
    "5.2.1",
    "5.2.0",
    "5.1.2",
    "5.1.1",
    "5.1.0",
    "5.0.2",
    "5.0.1",
    "5.0.0-rc.1",
    "5.0.0-rc.3",
    "5.0.0",
    "5.0.0-beta.2",
    "5.0.0-beta.1",
    "5.0.0-alpha.2",
    "5.0.0-alpha.1",
    "4.9.0-rc.1",
    "4.8.0",
    "4.7.0",
    "4.6.0-rc.1",
    "4.6.0",
    "4.5.0-rc.2",
    "4.5.0-rc.1",
    "4.5.0",
    "4.4.0-rc.1",
    "4.4.0",
    "4.3.0-rc.2",
    "4.3.0-rc.1",
    "4.3.0",
    "4.2.1-rc1",
    "4.2.1-rc.3",
    "4.2.1-rc.2",
    "4.2.1",
    "4.2.0-rc.2",
    "4.2.0-rc.1",
    "4.1.0.rc2",
    "4.1.0.rc1",
    "4.1.0.rc0",
    "4.1.0-release",
    "4.1.0-rc2",
    "4.1.0-rc.2",
    "4.1.0-rc.1",
    "4.1.0-rc.0",
    "4.1.0",
    "4.0.4",
    "4.0.3",
    "4.0.2",
    "4.0.0",
    "3.8.5",
    "3.8.4",
    "3.8.3",
    "3.8.2",
    "3.8.0",
    "3.7.2",
    "3.7.1",
    "3.7.0",
    "3.6.2",
    "3.6.1",
    "3.6.0",
    "3.5.4",
    "3.5.3",
    "3.5.2",
    "3.5.1",
    "3.5.0",
    "3.4.0",
    "3.3.2",
    "3.3.1",
    "3.3.0",
    "3.2.3",
    "3.2.2",
    "3.2.1",
    "3.2.0",
    "3.1.9",
    "3.1.8",
    "3.1.7",
    "3.1.6",
    "3.1.5",
    "3.1.4",
    "3.1.3",
    "3.1.2",
    "3.1.10",
    "3.1.1",
    "3.1.0",
    "3.0.2",
    "3.0.1",
    "3.0.0",
    "2.2.7",
    "2.2.6",
    "2.2.5",
    "2.2.4",
    "2.2.3",
    "2.2.2",
    "2.2.1",
    "2.2.0",
    "2.1.9",
    "2.1.8",
    "2.1.10"
])
const currentVersion = ref('5.3.0')
const chartContainer = ref(null)
const echartsObj = ref()
const changeVersion = async (e:any)=>{
  chartData.loading = true;
  await loadScript(e)
  runCode()    
}
const loadScript = (version:string)=>{
  return new Promise(res=>{
    let src =  `https://cdn.staticfile.org/echarts/${version}/echarts.min.js`
    // let src = `https://cdn.bootcdn.net/ajax/libs/echarts/${version}/echarts.min.js`
    let script:any = document.createElement('script');
    script.src = src
    script.type = 'text/javascript'
    let s:any = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(script, s);
    script.onload=script.onreadystatechange=function(){
      console.log('加载完成');
      res(true)
    }  
  })
}
const formatCode = ()=>{
  monocoInit.value.getAction()
}  
const replaceAll = (L:string, O:string, A:string)=> {
  return L.replace(new RegExp(O,"g"), A)
}
const runCode  =()=>{
  ((window:any)=>{
    try {
    echartsObj.value = window.echarts.init(chartContainer.value) 
    window.onresize = echartsObj.value.resize
    const config = useRuntimeConfig()
    let code = replaceAll(textValue.value||'', "/asset/get", `${config.public.appOssBase}}/asset/get`);
    let Re = new Function("$","echarts","myChart",
    `
        ${code}
      if(option){
        return option
      }
      `)(window.jQuery, window.echarts, echartsObj.value);
      Re && !code.includes("myChart.setOption") && echartsObj.value.setOption(Re)
      Re =null
      chartData.loading = false;
    }catch (A:any) {
      chartData.loading = false;
      Message.error(String(A))
    }
  })(window)
}  
const chartData = reactive({
  title: '',
  echartsVersion:'',
  loading: true,
});
const monocoInit = ref()
const { chartDetail } = useApi()
const getData = async() => {
  const {data:dataInfo} = await chartDetail.getChartDetail({
    cid: props.cid,
  })
  const {code, data,message}= dataInfo.value
  Bus.$emit("search-loading", false);
  chartData.loading = false;
  if (code === 0) {
    textValue.value = data.code
    currentVersion.value = data.echartsVersion
    chartData.echartsVersion = data.echartsVersion
    monocoInit.value.setValue(textValue.value)
    nextTick(() => {
      changeVersion(data.echartsVersion)
    });
  } else {
    Message.error(message || "服务器开小差了，请稍后再试...");
  }
};
</script>
<style scoped lang='scss'>
.chart-detail{
  width: 100%;
  display: flex;
  height: 100%;
  padding: 10px 30px 20px;
}
.code-left{
  width: calc(54% - 10px);
  height: 100%;
  margin-right: 10px;
}
.chart-right{
  width: calc(46% - 10px);
  height: 100%;
  margin-left: 10px;
  position: relative;
   .arco-spin-loading{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
}
.chart-version,.handle-group{
  width: calc(100% - 20px);
  height: 42px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom:8px;
}
.handle-group{
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.chart-container,.code-container{
  width: 100%;
  height: calc(100% - 36px);
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  position: relative;
}
</style>