/**
 * Date：2018/4/3
 * Author：Wangtaidong
 */
import request from '../../utils/request';

export async function inquire(params) {
  return request('/notice/getNotices', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
