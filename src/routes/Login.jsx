import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import LoginPage from '../components/Login/page';
import io from '../utils/socket.io';
import { getSession, toJson, saveSession, toStr, config, queryURL } from '../utils/index';

const socket = io.connect(config.SOCKET_ADDRESS);

function Login({ location, dispatch, login }) {
  const {
     name,
  } = login.login;
  const {
    loading,
  } = login.report;

  // 获取基础资料,如果可以取得user的session，那么就读取基础资料信息
  const getBaseInfo = () => {
    const loginId = !(toJson(getSession('sessionid')) === 'expired') ? toJson(getSession('sessionid')) : null;
    const msg = {
      header: {
        sessionid: loginId,
      },
      message: {
        path: 'basic/query',
        args: {
          groupcode: toJson(getSession('groupcode')),
        },
      },
    };
    dispatch({ type: 'report/showLoading' });
    socket.emit('event', msg);
  };
  const getBrandTree = () => {
    const loginId = !(toJson(getSession('sessionid')) === 'expired') ? toJson(getSession('sessionid')) : null;
    const msg = {
      header: {
        sessionid: loginId,
      },
      message: {
        path: 'basic/queryAllOrgInfos',
      },
    };
    dispatch({ type: 'report/showLoading' });
    socket.emit('event', msg);
  };
  const { queryString } = location.query;
  const loginPageProps = {
    loading,
    name,

    onLogin(param) {
      const loginId = !(toJson(getSession('sessionid')) === 'expired') ? toJson(getSession('sessionid')) : null;
      const msg = {
        header: {
          sessionid: loginId,
        },
        message: {
          path: 'user/login',
          args: param,
        },
      };
      dispatch({ type: 'report/showLoading' });
      socket.emit('login', msg);
// 监听登录
      socket.removeAllListeners('login');
      socket.on('login', (data) => {
        message.destroy();
        if (data.header.status === 'success') {
          if (data.message.result === 'SUCCESS') {
            dispatch({ type: 'report/hideLoading' });
            // 存储sessionid，user，groupcode至session中
            saveSession('sessionid', toStr(data.header.sessionid));
            saveSession('user', toStr(data.message.user.username));
            saveSession('groupcode', toStr(data.message.user.groupcode));
            // 获取基础资料
            getBaseInfo();
            // 获取目录树
            getBrandTree();
            // 保存门店信息
            dispatch({
              type: 'report/getStoreInfo',
              payload: data.message.user.vscode,
            });
            const from = queryURL('from');
            if (from) {
              dispatch(routerRedux.push(from));
            } else {
              dispatch(routerRedux.push('/dashboard'));
            }
          } else {
            message.error(data.message.result, 3);
          }
        } else if (data.header.status === 'error') {
          message.error(data.message.result, 3);
        } else if (data.header.status === 'unlogin') {
          message.warning('请重新登陆！', 3);
          dispatch(routerRedux.push('/login'));
        }
      });
      dispatch({ type: 'report/hideLoading' });
    },
  };


  return (
    <div className="login-page">
      <LoginPage {...loginPageProps} />
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(login) {
  return { login };
}

export default connect(mapStateToProps)(Login);

