import { message } from 'antd';
import { delSession, saveSession, toStr, config } from '../utils';
import io from '../utils/socket.io';

const socket = io.connect(config.SOCKET_ADDRESS);

export default {
  namespace: 'login',
  state: {
    loading: false,
    name: 'jack',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/login') {
          delSession('sessionid');
          delSession('user');
          delSession('groupcode');
          // 监听基础资料
          socket.removeAllListeners('baseinfo');
          socket.on('baseinfo', (data) => {
            saveSession('sessionid', toStr(data.header.sessionid));
            message.destroy();
            if (data.header.status === 'success') {
              dispatch({
                type: 'report/hideLoading',
              });
              dispatch({
                type: 'report/getBaseInfo',
                payload: data,
              });
            } else if (data.header.status === 'error') {
              message.error(data.message.result, 3);
            } else if (data.header.status === 'unlogin') {
              message.warning('请重新登陆！', 3);
            }
          });

          socket.removeAllListeners('queryAllOrgInfos');
          socket.on('queryAllOrgInfos', (data) => {
            saveSession('sessionid', toStr(data.header.sessionid));
            message.destroy();
            if (data.header.status === 'success') {
              dispatch({
                type: 'report/hideLoading',
              });
              dispatch({
                type: 'report/getBrandTree',
                payload: data,
              });
            } else if (data.header.status === 'error') {
              message.error(data.message.result, 3);
            } else if (data.header.status === 'unlogin') {
              message.warning('请重新登陆！', 3);
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
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
  },
};
