import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});
// 请求拦截器
api.interceptors.request.use(config => {
    // 添加认证token
    config.headers.Authorization = 'Bearer fake-token';
    // 显示加载状态
    // setLoading(true);
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;

