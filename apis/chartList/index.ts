/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-15 15:40:09
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-15 17:02:11
 */
import type { ChartListParams, ChartResultModel } from '~/apis/chartList/typing'
import type { HttpOption } from '~/composables/useHttp'

export * from './typing'
enum Api {
  getChartList = '/chart-list',
}

export async function getChartList(params: ChartListParams, option?: HttpOption<ChartResultModel[]>) {
  return useHttp.get<ChartResultModel[]>(Api.getChartList, params, option)
}
