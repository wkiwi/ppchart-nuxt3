/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-17 17:23:56
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-18 14:55:53
 */
import Index from '@/pages/index.vue'
import { RouteRecordName } from "vue-router"

export const isSearchEnabled = (pageLoaded: boolean, routeName?: RouteRecordName | null) => {    
    return [Index.name].includes(String(routeName)) && pageLoaded
}