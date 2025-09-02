import axios from "axios";

const api = axios.create({
    baseURL: '/', // 代理到后端服务
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

// 响应拦截器
api.interceptors.response.use(response => {
    return response;
}, error => {
    // 统一错误处理
    console.alert('请求出错: ' + error.message);
    return Promise.reject(error);
}
);

export default api;

