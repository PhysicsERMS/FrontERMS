/**
 * Date：2018/4/25
 * Author：Wangtaidong
 */

import request from '../../utils/request';

export async function inquire(params) {
  return request('/notice/getNotices', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function create(params) {
  return request('/notice/create', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function update(params) {
  return request('/notice/update', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function remove(params) {
  return request('/notice/remove', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
