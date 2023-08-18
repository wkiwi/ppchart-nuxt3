/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-15 15:40:09
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-17 10:11:01
 */
import type { CharDetailParams, ChartDetailResultModel } from './typing'
import type { HttpOption } from '~/composables/useHttp'

export * from './typing'
enum Api {
  getChartDetail = '/chart-detail',
}

export async function getChartDetail(params: CharDetailParams, option?: HttpOption<ChartDetailResultModel>) {
  return useHttp.get<ChartDetailResultModel>(Api.getChartDetail, params, option)
}
