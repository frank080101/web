import request from '@/utils/request';

export function getVersions(params?: any) {
  return request('GET', '/versions/' + params?.type);
}

export function getCases(params?: any) {
  return request('GET', '/cases/' + params?.type);
}

export function getMetrics(params?: any) {
  return request('GET', '/metrics/' + params?.type);
}

export function submit(params: any) {
  return request('POST', '/send', params);
}

export function getTableData(params?: any) {
  return request('GET', '/table/' + params?.type);
}

export function setTableItemStatus(params?: any) {
  return request('POST', '/setStatus/' + params?.type, params);
}
