import axios, { AxiosRequestConfig } from "axios";
import { toast } from "sonner";

const baseURL = "http://localhost:3000";

interface ApiData<T = any> {
  success: boolean
  message: string | null
  result: T | null
  code: number | null
}

interface MyRequest {
  get: (url: string, config?: AxiosRequestConfig) => Promise<ApiData>
  post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<ApiData>
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 10 * 1000,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  function (response) {
    const data: ApiData = response.data;
    if (!data.success) {
      // todo: code区分
      toast.error('服务器开小差了～', {
        description: `url: ${response.config.url}`,
      });
    }
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

// 修改调用形式，get 或 post 待完善
const request: MyRequest = {
  get: async (url, config) => {
    const res = await axiosInstance.get<ApiData>(url, config);
    return res.data;
  },
  post: async (url, data, config) => {
    const res = await axiosInstance.post<ApiData>(url, data, config);
    return res.data;
  },
};

export default request;
