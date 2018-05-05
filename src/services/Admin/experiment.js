/**
 * Date：2018/4/2
 * Author：Wangtaidong
 */
import request from '../../utils/request';

export async function inquire(params) {
  return request('/admin/getExperiments', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function detail(params) {
  return request('/api/org/getStoreData', {
    method: 'post',
    body: params,
  });
}

export async function update(params) {
  return request('/api/org/updateStoreData', {
    method: 'post',
    body: params,
  });
}
