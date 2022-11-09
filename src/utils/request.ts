import axios from 'axios';

const Service = axios.create({
  // baseURL: '/api',
  timeout: 30 * 1000,
});

//拦截器
//请求拦截
Service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
Service.interceptors.response.use((response: any) => {
  return response.data;
});

interface RequestOptions {
  headers?: any;
  isCache?: boolean;
}

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

const request = (
  method: Method,
  path: string,
  params?: any,
  options?: RequestOptions,
): Promise<any> => {
  return Service({
    method,
    url: path,
    params: method === 'GET' ? params : undefined,
    data: method !== 'GET' ? params : undefined,
    headers: options?.headers,
    ...options,
  });
};

export default request;
