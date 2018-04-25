/**
 * Date：2018/4/3
 * Author：Wangtaidong
 */
import request from '../../utils/request';

export default async function inquire() {
  return request('/mock/11/physicsEDPS/getNotices', {
    method: 'post',
  });
}
