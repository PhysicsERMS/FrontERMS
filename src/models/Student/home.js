/**
 * Date：2018/4/24
 * Author：Wangtaidong
 */
import { message } from 'antd';
import { inquire } from '../../services/Student/home';

export default {
  namespace: 'studentHome',
  state: {
    loading: false,
    listData: [
      {
        title: '请同学们在第五周之前将电学元件的伏安特性研究实验报告提交',
        content: '请同学们在第五周之前将电学元件的伏安特性研究实验报告提交,请同学们在第五周之前将电学元件的伏安特性研究实验报告提交,请同学们在第五周之前将电学元件的伏安特性研究实验报告提交,请同学们在第五周之前将电学元件的伏安特性研究实验报告提交,请同学们在第五周之前将电学元件的伏安特性研究实验报告提交',
        time: '2018-03-04',
        teacherName: 'Buxingjie',
      }, {
        title: '请同学们在第五周之前将电学元件的伏安特性研究实验报告提交',
        content: '请同学们在第五周之前将电学元件的伏安特性研究实验报告提交',
        time: '2018-03-04',
        teacherName: 'Buxingjie',
      }, {
        title: '请同学们在第五周之前将电学元件的伏安特性研究实验报告提交',
        content: '请同学们在第五周之前将电学元件的伏安特性研究实验报告提交',
        time: '2018-03-04',
        teacherName: 'Buxingjie',
      },
    ],
    modalVisible: false,
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
        if (location.pathname === 'student/home') {
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
      yield put({ type: 'showLoading' });
      const res = yield call(inquire, payload);
      const { data, code } = res;
      if (code === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            listData: data.data,
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
