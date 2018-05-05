/**
 * Date：2018/5/5
 * Author：Wangtaidong
 */
import request from '../../utils/request';

export async function detail(params) {
  return request('/teacher/getStudentsByEId', {
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
