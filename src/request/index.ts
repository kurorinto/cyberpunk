import axios, { AxiosRequestConfig } from "axios"
import { toast } from "sonner"
import store from 'store'

const baseURL = "http://localhost:3000"

export const ACCESS_TOKEN_KEY = 'cyberpunk_access'
export const REFRESH_TOKEN_KEY = 'cyberpunk-refresh'
export const ACCESS_TOKEN_SECRET = new TextEncoder().encode('kurorinto_access')
export const REFRESH_TOKEN_SECRET = new TextEncoder().encode('kurorinto_refesh')

/** 
 * 401: 未登录
 * 402: 登录失效
 * 403: 无权限
 * 500: 服务器错误
 * null: 无错误
 */
export type CODE = 500 | 401 | 402 | 403

export interface ApiData<T = any> {
  success: boolean
  message: string | null
  result: T | null
  code: CODE
}

interface MyRequest {
  get: (url: string, config?: AxiosRequestConfig) => Promise<ApiData>
  post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<ApiData>
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 10 * 1000,
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  async function (response) {
    const data: ApiData = response.data
    const { headers } = response
    const { success, code, result, message } = data
    // 成功拦截
    if (success) {
      // 设置refreshToken
      const rt = headers[REFRESH_TOKEN_KEY]
      if (rt) {
        store.set(REFRESH_TOKEN_KEY, rt)
      }
    } else {
      // 失败处理
      switch (code) {
        case 401:
          // 清除rt
          store.remove(REFRESH_TOKEN_KEY)
          toast.error(message || '请先登录', {
            description: `url: ${response.config.url}`,
          })
          window.location.href = `/sign/in`
          break
        case 402:
          // 登录失效 重新获取
          const rt = store.get(REFRESH_TOKEN_KEY)
          const { success: refreshSuccess } = await request.post('/api/account/refresh', { rt })
          if (refreshSuccess) {
            // 重新请求
            const res = await axiosInstance(response.config)
            return res
          }
          break
        case 500:
          toast.error(message || '服务器开小差了', {
            description: `url: ${response.config.url}`,
          })
          break
        default:
          toast.error(message || '未知错误', {
            description: `url: ${response.config.url}`,
          })
          break
      }
    }
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

// 修改调用形式，get 或 post 待完善
const request: MyRequest = {
  get: async (url, config) => {
    const res = await axiosInstance.get<ApiData>(url, config)
    return res.data
  },
  post: async (url, data, config) => {
    const res = await axiosInstance.post<ApiData>(url, data, config)
    return res.data
  },
}

export default request
