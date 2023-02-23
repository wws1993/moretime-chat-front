import projectConfig from "@config/project.config"
import Axios from "axios"

/** axios实例 */
const axiosInstance = Axios.create({
  baseURL: projectConfig.baseUrl,
  timeout: -1
})

axiosInstance.interceptors.request.use(config => {
  config.headers = config.headers || {}

  return config
})

export default axiosInstance
