/**
 * Date：2018/4/2
 * Author：Wangtaidong
 */
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { detail } from '../../services/Teacher/detail';

export default {
  namespace: 'teacherDetail',
  state: {
    loading: false,
    listData: [],
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
        const pathname = location.pathname;

        const re = pathToRegexp('/teacher/experiment/:itemTd'); // 有冒号
        const match = re.exec(pathname);
        if (match) {
          const itemId = match[1];
          dispatch({
            type: 'query',
            payload: {
              id: itemId,
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
      yield put({ type: 'showLoading' });
      const res = yield call(detail, payload);
      const { code, data, page } = res.data;
      if (code === 200) {
        const paginationOld = yield select(state => state.teacherDetail.pagination);
        yield put({
          type: 'querySuccess',
          payload: {
            listData: data,
            pagination: {
              ...paginationOld,
              total: page.total,
              current: page.current,
              pageSize: page.pageSize,
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
