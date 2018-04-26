/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import request from '../../utils/request';

export default async function changePass(params) { // 查询所有机构列表
  return request('/api/org/getAll', {
    method: 'post',
    body: params,
  });
}
