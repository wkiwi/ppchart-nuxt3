/*
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2023-08-15 15:40:14
 * @LastEditors: wkiwi
 * @LastEditTime: 2023-08-15 15:59:26
 */
export type ChartType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export interface ChartResultModel {
  id: number
  banner_img: string
}
export interface ChartListParams {
  type: ChartType
  search?: string
  current: number
}
