import request from '@/utils/request';

export function getVersions(params?: any) {
  return request('GET', '/versions', params);
}

export function getCalculate(params?: any) {
  return request('GET', '/calculate', params);
}

export function getCases(params?: any) {
  return request('GET', '/cases', params);
}

export function getMetrics(params?: any) {
  return request('GET', '/metrics', params);
}

export function submit(params: any) {
  return request('POST', '/send', params);
}
