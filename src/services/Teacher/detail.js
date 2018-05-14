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

export async function grade(params) {
  return request('/teacher/public/save', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
