<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-17 11:37:58
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-17 11:52:59
-->
<script setup lang="ts">
import '@arco-design/web-vue/es/radio/style/css.js'
import { RadioGroup, Radio } from "@arco-design/web-vue";
const props = defineProps({
    modelValue: String,
});
const emits = defineEmits(['change'])
const modelValue = useModel(props)
</script>
<template>
    <template v-for="dataList in CHART_TYPE_GROUP">
        <RadioGroup type="button" v-model="modelValue" @change="typeName => emits('change', typeName)" size="large">
            <Radio :value="item" v-for="item in dataList" :key="item">{{ item }}</Radio>
        </RadioGroup>
        <div style="height: 10px"></div>
    </template>
</template>