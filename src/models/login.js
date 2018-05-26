import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { saveSession, delSession } from '../utils';
import { quitSystem, adminLogin, studentLogin, teacherLogin } from '../services/login';

export default {
  namespace: 'login',
  state: {
    isLogin: false,
    loading: false,
    identity: '',
  },
  subscriptions: {},
  effects: {
    * adminLogin({ payload }, { call, put }) {
      const res = yield call(adminLogin, payload);
      const { data, code } = res.data;
      if (code === 200) {
        yield put({
          type: 'app/updateState',
          payload: {
            user: data || {},
          },
        });
        saveSession('isLogin', 'yes');
        saveSession('identity', payload.identity);
        saveSession('user', JSON.stringify(data));
        yield put(routerRedux.push('/admin/home'));
        message.success('登陆成功');
      } else {
        message.warning(res.data.msg);
      }
    },
    * teacherLogin({ payload }, { put, call }) {
      const res = yield call(teacherLogin, payload);
      const { data, code } = res.data;
      if (code === 200) {
        yield put({
          type: 'app/updateState', // 登陆成功返回完整user信息，并且更新保存在app中
          payload: {
            user: data || {},
          },
        });
        saveSession('isLogin', 'yes');
        saveSession('identity', payload.identity);
        saveSession('user', JSON.stringify(data));
        yield put(routerRedux.push('/teacher/home'));
        message.success('登陆成功');
      } else {
        message.warning(res.data.msg);
      }
    },
    * studentLogin({ payload }, { put, call }) {
      const res = yield call(studentLogin, payload);
      const { data, code } = res.data;
      if (code === 200) {
        yield put({
          type: 'app/updateState',
          payload: {
            user: data || {},
          },
        });
        saveSession('isLogin', 'yes');
        saveSession('identity', payload.identity);
        saveSession('user', JSON.stringify(data));
        yield put(routerRedux.push('/student/home'));
        message.success('登陆成功');
      } else {
        message.warning(res.data.msg);
      }
    },
    * logoutSystem({ payload }, { call }) {
      window.location = `${window.location.origin}/index.html#/login`;
      delSession('isLogin');
      delSession('identity');
      const res = yield call(quitSystem);
      const { code } = res.data;
      if (code === '200') {
        message.success('退出成功！');
        // 删除相关缓存
        delSession('isLogin');
        delSession('identity');
        delSession('user');
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    querySuccess(state, { payload }) {
      return { ...state, ...payload, loading: false };
    },
  },
};
