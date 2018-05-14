/**
 * Date：2018/4/3
 * Author：Wangtaidong
 */
import request from '../utils/request';

export async function adminLogin(params) {
  return request('/admin/login', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function teacherLogin(params) {
  return request('/teacher/login', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function studentLogin(params) {
  return request('/student/login', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
