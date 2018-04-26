/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import { message } from 'antd';
import { inquire } from '../../services/Admin/experiment';

export default {
  namespace: 'adminExperiment',
  state: {
    loading: false,
    searchInfo: '',
    listData: [{  // 这里只是模拟数据
      id: '10023',
      name: '交流电桥的使用与研究',
      teacherName: '步行街',
      classRoom: '基础D306',
    }, {
      id: '10021',
      name: '电学元件的伏安特性研究',
      classRoom: '基础D304',
      teacherName: '步行街',
    }, {
      id: '10022',
      name: '模拟法测绘静电场',
      classRoom: '基础D308',
      teacherName: '步行街',
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
        if (location.pathname === '/admin/student') {
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
