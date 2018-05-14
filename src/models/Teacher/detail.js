/**
 * Date：2018/4/2
 * Author：Wangtaidong
 */
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { detail, grade } from '../../services/Teacher/detail';

export default {
  namespace: 'teacherDetail',
  state: {
    loading: false,
    listData: [],
    itemId: '', // 实验id
    preScore: '',
    score: '',
    operareScore: '',
    viewUrl: '', // 上传实验报告返回url
    subId: '', // 保存预约实验id，用于文件上传和打分操作
    modalVisible: false,
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
            type: 'updateState',
            payload: {
              itemId,
            },
          });
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
      const id = yield select(state => state.teacherDetail.itemId);
      yield put({ type: 'showLoading' });
      const res = yield call(detail, { ...payload, id });
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
    * grade({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const res = yield call(grade, payload);
      const { code } = res.data;
      if (code === 200) {
        const pagination = yield select(state => state.teacherDetail.pagination);
        yield put({
          type: 'query',
          payload: {
            page: {
              current: pagination.current,
              pageSize: pagination.pageSize,
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
