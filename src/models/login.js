import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { saveSession, delSession } from '../utils';
import { quitSystem } from '../services/login';
// adminLogin, teacherLogin, studentLogin,
export default {
  namespace: 'login',
  state: {
    isLogin: false,
    loading: false,
    identity: '',
  },
  subscriptions: {},
  effects: {
    * adminLogin({ payload }, { put }) {
      saveSession('isLogin', 'yes');
      saveSession('identity', payload.identity);

      yield put(routerRedux.push('/admin/home'));
      message.success('登陆成功');
      // const res = yield call(adminLogin, payload);
      // const { data, code } = res;
      // if (code === 200) {
      //   yield put({
      //     type: 'app/updateState',
      //     payload: {
      //       user: {
      //         username: data.userName || '',
      //       },
      //     },
      //   });
      // } else {
      //   message.warning(res.data.msg);
      // }
    },
    * teacherLogin({ payload }, { put }) {
      saveSession('isLogin', 'yes');
      saveSession('identity', payload.identity);
      yield put(routerRedux.push('/teacher/home'));
      message.success('登陆成功');
      // const res = yield call(teacherLogin, payload);
      // const { data, code } = res;
      // if (code === 200) {
      //   yield put({
      //     type: 'app/updateState',
      //     payload: {
      //       user: {
      //         username: data.userName || '',
      //       },
      //     },
      //   });
      // } else {
      //   message.warning(res.data.msg);
      // }
    },
    * studentLogin({ payload }, { put }) {
      saveSession('isLogin', 'yes');
      saveSession('identity', payload.identity);
      yield put(routerRedux.push('/student/home'));
      message.success('登陆成功');
      // const res = yield call(studentLogin, payload);
      // const { data, code } = res;
      // if (code === 200) {
      //   yield put({
      //     type: 'app/updateState',
      //     payload: {
      //       user: {
      //         username: data.userName || '',
      //       },
      //     },
      //   });
      // } else {
      //   message.warning(res.data.msg);
      // }
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
