/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import { message } from 'antd';
import { changePass } from '../../services/Admin/personal';

export default {
  namespace: 'personal',
  state: { },
  subscriptions: { },
  effects: {
    * changePass({ payload }, { call }) {
      const res = yield call(changePass, payload);
      const { code, msg } = res.data;
      if (code === 200) {
        message.success(msg);
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    querySuccess(state, { payload }) {
      return { ...state, ...payload, loading: false };
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },

    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
  },
};
