import {ElMessage} from 'element-plus'
import axios from 'axios'
import useUseStore from '@/stores/user'
// 第一步：利用axios对象的create方法，去创建axios实例(其他的配置：基础路径、超时时间)
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})
request.interceptors.request.use(config => {
  const useStore = useUseStore()
  if (useStore.token) {
    config.headers.Authorization = `Bearer ${useStore.token}`
  }
  return config
})
request.interceptors.response.use(response => {
  return response.data
}, error => {
  //处理网络错误
  let msg = ''
  console.log(error)
  const status = error.response.status
  switch (status) {
    case 401:
      msg = 'token过期'
      break
    case 403:
      msg = '无权访问'
      break
    case 404:
      msg = '请求地址错误'
      break
    case 500:
      msg = '服务器出现问题'
      break
    default:
      msg = '网络出现问题'
      break
  }
  ElMessage({
    type: 'error',
    message: msg,
  })
  return Promise.reject(error)
})

export default request
