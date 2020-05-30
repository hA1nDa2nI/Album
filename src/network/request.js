import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'api',
    timeout: 5000
  })
  
  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
    return config  // 拦截完要返回
  }, err => {
    console.log(err); // 发送请求失败时
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    console.log(err);
  })

  // 3. 发送真正的网络请求
  return instance(config);
}
