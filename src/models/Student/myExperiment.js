/**
 * Date：2018/4/24
 * Author：Wangtaidong
 */
import { message } from 'antd';
import { inquire } from '../../services/Student/myExperiment';

export default {
  namespace: 'studentExperiment',
  state: {
    loading: false,
    listData: [{
      id: '10021',
      name: '电学元件的伏安特性研究',
      room: '基础D304',
      classTime: '05030708',
      status: 0,
      score: '',
      preStatus: 0,
      preScore: '',
      viewUrl: '',
    }, {
      id: '10022',
      name: '模拟法测绘静电场',
      room: '基础D308',
      classTime: '05030708',
      status: 1,
      score: '',
      preStatus: 1,
      preScore: '',
      viewUrl: '',
    }, {
      id: '10023',
      name: '交流电桥的使用与研究',
      room: '基础D306',
      classTime: '05030708',
      status: 2,
      score: '98',
      preStatus: 1,
      preScore: '',
      viewUrl: 'https://github.com/Maiduo007',
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
    file: [],
    fileUrl: '',
    subModalVisible: false,
    viewModalVisible: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/student/myExperiment') {
          dispatch({
            type: 'query',
            payload: {
              page: {
                pageno: 1, // 查看第几页内容 默认1
                rowcount: 10, // 一页展示条数 默认10
                orderby: {},
              },
            },
          });
        }
      });
    },
  },
  effects: {
    * query({ payload }, { call, put }) {
      // yield put({ type: 'showLoading' });
      const response = yield call(inquire, payload);
      if (response.data.status === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            listData: response.data.data,
          },
        });
      } else {
        yield put({ type: 'hideLoading' });
        message.warning(response.data.msg);
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
      return { ...state, ...payload };
    },

    hideModal(state, { payload }) {
      return { ...state, ...payload };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
  },
};
