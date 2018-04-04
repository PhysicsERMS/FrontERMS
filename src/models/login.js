import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { saveSession } from '../utils';
// import { adminLogin, teacherLogin, studentLogin } from '../services/login';

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
      yield put(routerRedux.push('/teacher/myExperiment'));
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
