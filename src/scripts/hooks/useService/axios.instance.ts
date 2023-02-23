import projectConfig from "@config/project.config"
import Axios from "axios"

/** axios实例 */
const axiosInstance = Axios.create({
  baseURL: projectConfig.baseUrl,
  timeout: -1
})

axiosInstance.interceptors.request.use(config => {
  /** 生成CancelToken，用于取消请求 */
  const source = Axios.CancelToken.source()

  config.headers = config.headers || {}
  config.cancelToken = source.token

  return config
})

export default axiosInstance
