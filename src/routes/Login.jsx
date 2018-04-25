import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import LoginPage from '../components/Login/page';
import { getSession, toJson, saveSession, toStr, config, queryURL } from '../utils/index';


const Login = ({ dispatch, state }) => {
  const { name, loading } = state.login;

  const loginPageProps = {
    loading,
    name,
    onSelect(param) {
      dispatch({
        type: 'app/updateState',
        payload: {
          identity: param,
        },
      });
    },
    onLogin(param) {
      if (param.identity === 'admin') {
        dispatch({
          type: 'login/adminLogin',
          payload: param,
        });
      } else if (param.identity === 'teacher') {
        dispatch({
          type: 'login/teacherLogin',
          payload: param,
        });
      } else if (param.identity === 'student') {
        dispatch({
          type: 'login/studentLogin',
          payload: param,
        });
      } else {
        message.warn('系统不存在此身份');
      }
    },
  };
  return (
    <div className="login-page">
      <LoginPage {...loginPageProps} />
    </div>
  );
};

Login.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Login);

