import React from 'react';
import { Router } from 'dva/router';
import { routerRedux } from 'dva/router';
import App from './routes/App';

function RouterConfig({ history, app, routes, dispatch }) {
  const router = [
    {
      path: '/',
      name: 'app',
      component: App,
      onEnter(nextState) {
        app._store.dispatch({
          type: 'report/checkLogin',
        });

        const { pathname } = nextState.location;

        if (pathname !== '/merchants/register' && pathname !== '/merchants/forgetPassword') {
          app._store.dispatch({
            type: 'merchantApp/queryAuthority',
          });

          app._store.dispatch({
            type: 'merchantApp/getPower',
          });
        }
      },
      childRoutes: routes,
    },
  ];
  return (
    <Router history={history} routes={router} />
  );
}

export default RouterConfig;
