/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import request from '../../utils/request';

export async function query(params) { // 查询所有机构列表
  return request('/api/org/getAll', {
    method: 'post',
    body: params,
  });
}

export async function detail(params) { // 编辑门店信息
  return request('/api/org/getStoreData', {
    method: 'post',
    body: params,
  });
}

export async function update(params) { // 编辑后保存门店信息
  return request('/api/org/updateStoreData', {
    method: 'post',
    body: params,
  });
}
