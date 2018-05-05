/**
 * Date：2018/4/24
 * Author：Wangtaidong
 */
import { message } from 'antd';
import { inquire, saveUrl } from '../../services/Student/myExperiment';

export default {
  namespace: 'studentExperiment',
  state: {
    loading: false,
    fileId: 0,
    temUrl: '',
    listData: [{
      id: '10021',
      name: '电学元件的伏安特性研究',
      classRoom: '基础D304',
      classTime: '05030708',
      status: 0,
      score: '',
      preStatus: 0,
      preScore: '',
      viewUrl: '',
    }, {
      id: '10022',
      name: '模拟法测绘静电场',
      classRoom: '基础D308',
      classTime: '05030708',
      status: 1,
      score: '',
      preStatus: 1,
      preScore: '',
      viewUrl: '',
    }, {
      id: '10023',
      name: '交流电桥的使用与研究',
      classRoom: '基础D306',
      classTime: '05030708',
      status: 2,
      score: '98',
      preStatus: 1,
      preScore: '',
      viewUrl: 'http://127.0.0.1:3001/1525437130744基于Web的高校学生评教系统的设计与实现.pdf',
    }],

    // temUrl: '', //保存临时文件URL，hiddenModal时更新到相应列数据里
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
    page: 1,
    pages: 1,
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
      payload.id = 2;
      const res = yield call(inquire, payload);
      const { code, data, page } = res.data;
      if (code === 200) {
        const paginationOld = yield select(state => state.studentExperiment.pagination);
        yield put({
          type: 'querySuccess',
          payload: {
            listData: data,
            pagination: {
              ...paginationOld,
              total: page.total,
              current: page.pagenum,
              pageSize: page.pageSize,
            },
          },
        });
      } else {
        yield put({ type: 'hideLoading' });
        message.warning(res.data.msg);
      }
    },

    * saveUrl({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const res = yield call(saveUrl, payload);
      const { code } = res.data;
      if (code === 200) {
        const pagination = yield select(state => state.adminTeacher.pagination);
        yield put({
          type: 'query',
          payload: {
            page: {
              pageno: pagination.current,
              rowcount: pagination.pageSize,
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
