/**
 * Date：2018/4/3
 * Author：Wangtaidong
 */
import request from '../../utils/request';

export default async function query(params) {
  return request('/api/org/getAll', {
    method: 'post',
    body: params,
  });
}
