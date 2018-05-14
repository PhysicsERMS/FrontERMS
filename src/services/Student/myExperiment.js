/**
 * Date：2018/4/24
 * Author：Wangtaidong
 */
import request from '../../utils/request';

export async function inquire(params) {
  return request('/student/myExperiments', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function saveUrl(params) {
  return request('/student/public/save', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function update(params) { // 编辑后保存门店信息
  return request('/api/org/updateStoreData', {
    method: 'post',
    body: params,
  });
}
