/**
 * Date：2018/4/2
 * Author：Wangtaidong
 */
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { inquire } from '../../services/Teacher/myExperiment';

export default {
  namespace: 'teacherExperiment',
  state: {
    loading: false,
    // listData: [
    //   {
    //     id: '10021',
    //     name: '电学元件的伏安特性研究',
    //     room: '基础D304',
    //   }, {
    //     id: '10022',
    //     name: '模拟法测绘静电场',
    //     room: '基础D308',
    //   }, {
    //     id: '10023',
    //     name: '交流电桥的使用与研究',
    //     room: '基础D306',
    //   }
    // ],
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
        if (location.pathname === '/teacher/myExperiment') {
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
      const user = yield select(state => state.app.user);
      payload.id = user.id;
      yield put({ type: 'showLoading' });
      const res = yield call(inquire, payload);
      const { code, data, page } = res.data;
      if (code === 200) {
        const paginationOld = yield select(state => state.teacherExperiment.pagination);
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
    * detail({ payload }, { put }) {
      const path = `/teacher/experiment/${payload.itemId}`; // 无冒号
      yield put(routerRedux.push(path));
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
