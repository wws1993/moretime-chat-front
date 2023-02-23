import { toast } from "react-toastify";
import { setBaseResponseInterceptors } from "./useAdapt";

// 响应拦截
setBaseResponseInterceptors(async response => {
  console.log('[USESERVICE.RESPONSE.INTERCEPTORS]: ', response);

  if (response.status !== 200) {
    console.log(response.message);
    return toast.error('网络请求失败，请联系管理员！')
  }
  // 业务数据
  const result = response.data

  // 业务数据未正常返回（code不等于0）时，根据实际业务做出相应动作
  if (!!result.code) {
    switch (result.code) {
      case 0:        
        toast.error(result.message)
        break;
      default:
        toast.error(result.message)
        break;
    }

    return Promise.reject(response)
  } else return result
})

export default {}
