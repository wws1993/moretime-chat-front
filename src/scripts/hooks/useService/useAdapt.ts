import type { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "./axios.instance";

export interface RequestConfig {
  /** 请求头设置 */
  headers?: Record<string, string>;
}

interface Adapt {
  loading: boolean
  /** fetch请求 */
  Get: TServerFunction;
  /** post请求 */
  Post: TServerFunction;
  /** delete请求 */
  Delete: TServerFunction;
  /** update请求 */
  Update: TServerFunction;
  /** put请求 */
  Put: TServerFunction;
}

type TRequestFunction = (url: string, data?: any, method?: string, config?: RequestConfig) => Promise<any>
type TServerFunction<ReqDto = any, ResDto = any> = (url: string, data?: ReqDto, config?: RequestConfig) => Promise<ResDto>

export default (): Adapt => {
  const [loading, setLoading] = useState(false)
  const ajax: TRequestFunction = async (url, data = {}, method, config) => {
    return new Promise(resolve => {
      const option: AxiosRequestConfig = {url, method, data, headers: {
        'Content-type': 'application/json;charset=UTF-8',
        ...config?.headers
      }}
  
      if (method === 'get') {
        option.data = undefined
        option.params = data
      }
      
      setLoading(true)
      axiosInstance(option).then(resolve).catch((err: any) => {
        console.log(err);
        
        const errStatus = err.response?.status || err.status
        const errMsg = err.response?.data?.message || err.data?.message || '网络错误，请联系管理员！'
        // errStatus为200时，意味着业务错误已拦截，可不作提示。反之，则是AJAX响应状态错误，作出提示
        if (errStatus !== 200) {
          toast.error(errMsg)
        }
      }).finally(() => setLoading(false))
    });
  }

  return {
    loading,
    Get:    (url, data, config) => ajax(url, data, 'get', config),
    Put:    (url, data, config) => ajax(url, data, 'Put', config),
    Post:   (url, data, config) => ajax(url, data, 'post', config),
    Delete: (url, data, config) => ajax(url, data, 'delete', config),
    Update: (url, data, config) => ajax(url, data, 'update', config),
  }
}

/** 设置请求拦截器 */
export const setBaseResquestInterceptors: (baseConfig: (config: AxiosRequestConfig) => AxiosRequestConfig) => void = (createBaseConfig) => {
  axiosInstance.interceptors.request.use(async (config: any) => {  
    const baseConfig = createBaseConfig(config)
    let key: keyof AxiosRequestConfig;

    for (const __ in baseConfig) {
      key = __ as any

      config[key] = {...config[key], ...baseConfig[key]}
    }

    return config
  })
}
/** 设置响应拦截器 */
export const setBaseResponseInterceptors: <T = any>(interceptor: (response: T) => Promise<any>) => void = (interceptor) => {
  axiosInstance.interceptors.response.use(interceptor as any)
}
