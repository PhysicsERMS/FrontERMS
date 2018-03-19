import { message } from 'antd';
import { routerRedux } from 'dva/router';
import io from '../utils/socket.io';
import { getSession, toJson, config, saveSession, toStr } from '../utils/index';

const socket = io.connect(config.SOCKET_ADDRESS);

message.config({
  top: 300,
  duration: 5,
});

export default {
  namespace: 'dashboard',
  state: {
    list: [],
    dateArray: [],
    summaryFirst: [],
    summarySecond: [],
    summaryThird: [],
    summaryFourth: [],
    summaryFifth: [],
    amount: [],
    order: [],
    custom: [],
    loading: false,
    currentItem: {},
    selectedStores: [],
    cacheSelectStores: [],
    cacheStoreCodes: '',
    modalVisible: false,
    modalType: 'create',
    modalKey: null,
    modalError: false,
    modalErrorValue: null,
    startDateValue: null,
    endDateValue: null,
    endDateOpen: false,
    serverTime: null,
    filters: {
      vscode: '',
      vsname: null,
      acttypcode: '',
      querytype: '0', // 0表示按店分析、1表示按日汇总、2表示按月汇总
    },
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      size: 10,
    },
    paginationStore: {
      current: 1,
      total: 0,
      size: 10,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/dashboard' || location.pathname === '/') {
          const loginId = !(toJson(getSession('sessionid')) === 'expired') ? toJson(getSession('sessionid')) : null;
          const param = {};

          // 请求数据
          const msgBar = {
            header: {
              sessionid: loginId,
            },
            message: {
              path: 'report/queryHomePageChart',
              args: param,
            },
          };
          dispatch({ type: 'showLoading' });
          socket.emit('event', msgBar);
          console.log(msgBar);
          socket.removeAllListeners('queryHomePageChart');
          socket.on('queryHomePageChart', (data) => {
            console.error(data);
            saveSession('sessionid', toStr(data.header.sessionid));
            message.destroy();
            if (data.header.status === 'success' && data.message.info.length > 0) {
              dispatch({
                type: 'querySuccess',
                payload: {
                  summaryFirst: data.message.info[0].summaryFirst,
                  summarySecond: data.message.info[0].summarySecond,
                  summaryThird: data.message.info[0].summaryThird,
                  summaryFourth: data.message.info[0].summaryFourth,
                  summaryFifth: data.message.info[0].summaryFifth,
                  amount: data.message.info[0].amount,
                  order: data.message.info[0].order,
                  custom: data.message.info[0].custom,
                },
              });
            } else if (data.header.status === 'error') {
              dispatch({
                type: 'hideLoading',
              });
              message.error(data.message.result, 3);
            } else if (data.header.status === 'unlogin') {
              message.warning('请重新登陆！', 3);
              dispatch(routerRedux.push('/login'));
            }
          });
        }
      });
    },
  },

  effects: {
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    showModal(state, action) {
      return {
        ...state,
        ...action.payload,
        modalVisible: true,
        modalKey: Date.parse(new Date()) / 1000,
      };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
};

