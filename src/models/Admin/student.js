/**
 * Date：2018/4/2
 * Author：Wangtaidong
 */
import { message } from 'antd';
import { inquire } from '../../services/Admin/student';

export default {
  namespace: 'adminStudent',
  state: {
    loading: false,
    searchInfo: '',
    listData: [
    // {  // 这里只是模拟数据
    //   id: 1,
    //   number: 1409030116,
    //   name: '王泰东',
    //   college: '理学院',
    //   class: '应用物理1402',
    //   phone: '18560684220',
    // }, {
    //   id: 2,
    //   number: 1409030117,
    //   name: '王泰东',
    //   college: '理学院',
    //   class: '应用物理1403',
    //   phone: '18560684221',
    // }, {
    //   id: 3,
    //   number: 1409030118,
    //   name: '王泰东',
    //   college: '理学院',
    //   class: '应用物理1404',
    //   phone: '18560684222',
    // }, {
    //   id: 4,
    //   number: 1409030119,
    //   name: '王泰东',
    //   college: '理学院',
    //   class: '应用物理1405',
    //   phone: '18560684223',
    // }
    ],
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
        if (location.pathname === '/admin/student') {
          dispatch({
            type: 'query',
            payload: {
              page: {
                current: 1, // 查看第几页内容 默认1
                pageSize: 10, // 一页展示条数 默认10
                orderby: {},
              },
              key: '',
            },
          });
        }
      });
    },
  },
  effects: {
    * query({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const res = yield call(inquire, payload);
      const { code, data, page } = res.data;
      if (code === 200) {
        const paginationOld = yield select(state => state.adminStudent.pagination);
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

    * getStudents({ put }) {
      yield put({ type: 'showLoading' });
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
