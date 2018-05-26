/**
 * Date：2018/4/25
 * Author：Wangtaidong
 */
import { message } from 'antd';
import { inquire, create, update, remove } from '../../services/Teacher/home';

export default {
  namespace: 'teacherHome',
  state: {
    loading: false,
    listData: [],
    modalVisible: false,
    subModalVisible: false,
    currentItem: {}, // 当前通知
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/teacher/home') {
          dispatch({
            type: 'query',
            payload: {
              page: {
                current: 1, // 查看第几页内容 默认1
                pageSize: 10, // 一页展示条数 默认10
                orderby: {},
              },
            },
          });
        }
      });
    },
  },
  effects: {
    * query({ payload }, { call, put, select }) {
      const teacherId = yield select(state => state.app.user.id);
      payload.tId = teacherId;
      yield put({ type: 'showLoading' });
      const res = yield call(inquire, payload);
      const { data, code } = res.data;
      if (code === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            listData: data,
          },
        });
      } else {
        yield put({ type: 'hideLoading' });
        message.warning(res.data.msg);
      }
    },
    * add({ payload }, { call, put, select }) {
      const teacherId = yield select(state => state.app.user.id);
      payload.tId = teacherId;
      yield put({ type: 'showLoading' });
      const res = yield call(create, payload);
      const { code } = res.data;
      if (code === 200) {
        yield put({
          type: 'query',
          payload: {
            page: {
              current: 1, // 查看第几页内容 默认1
              pageSize: 10, // 一页展示条数 默认10
              orderby: {},
            },
          },
        });
      } else {
        yield put({ type: 'hideLoading' });
        message.warning(res.data.msg);
      }
    },

    * edit({ payload }, { call, put, select }) {
      const teacherId = yield select(state => state.app.user.id);
      payload.tId = teacherId;
      yield put({ type: 'showLoading' });
      const res = yield call(update, payload);
      const { code } = res.data;
      if (code === 200) {
        yield put({
          type: 'query',
          payload: {
            page: {
              current: 1, // 查看第几页内容 默认1
              pageSize: 10, // 一页展示条数 默认10
              orderby: {},
            },
          },
        });
      } else {
        yield put({ type: 'hideLoading' });
        message.warning(res.data.msg);
      }
    },

    * delete({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const res = yield call(remove, payload);
      const { code } = res.data;
      if (code === 200) {
        yield put({
          type: 'query',
          payload: {
            page: {
              current: 1, // 查看第几页内容 默认1
              pageSize: 10, // 一页展示条数 默认10
              orderby: {},
            },
          },
        });
      } else {
        yield put({ type: 'hideLoading' });
        message.warning(res.data.msg);
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
