/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import { message } from 'antd';
import { inquire } from '../../services/Admin/teacher';

export default {
  namespace: 'adminTeacher',
  state: {
    loading: false,
    searchInfo: '',
    listData: [{  // 这里只是模拟数据
      id: 1,
      name: '步行街1',
      phone: '18560684220',
      office: '基础D311',
    }, {
      id: 2,
      name: '步行街2',
      phone: '18560684221',
      office: '基础D311',
    }, {
      id: 3,
      name: '步行街3',
      phone: '18560684222',
      office: '基础D311',
    }, {
      id: 4,
      name: '步行街4',
      phone: '18560684223',
      office: '基础D311',
    }],
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
        if (location.pathname === '/admin/teacher') {
          dispatch({
            type: 'query',
            payload: {
              page: {
                pageno: 1, // 查看第几页内容 默认1
                rowcount: 10, // 一页展示条数 默认10
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
    * query({ payload }, { call, put }) {
      // yield put({ type: 'showLoading' });
      const res = yield call(inquire, payload);
      if (res.data.status === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            listData: res.data.data,
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
