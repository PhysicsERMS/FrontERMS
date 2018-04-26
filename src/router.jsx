import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Router } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './routes/App';

function RouterConfig({ history, routes, dispatch }) {
  const router = [
    {
      path: '/',
      name: 'app',
      component: App,
      indexRoute: { onEnter: (nextState, replace) => replace('/login') },
      onEnter(nextState) {
        const { pathname } = nextState.location;
        if (pathname !== '/login') {
          dispatch({
            type: 'app/checkLogin',
          });
        }
      },
      childRoutes: routes,
    },
  ];
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history} routes={router} />
    </LocaleProvider>
  );
}
RouterConfig.propTypes = {
  history: PropTypes.object,
  routes: PropTypes.array,
  dispatch: PropTypes.func,
};

export default connect()(RouterConfig);
