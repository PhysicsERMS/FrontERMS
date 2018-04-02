import React from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { Card } from 'antd';
import NProgress from 'nprogress';
import { Helmet } from 'react-helmet';
import io from '../utils/socket.io';
import { Layout, Loader } from '../components';
import '../themes/index.less';
import Error from './error/index';
import { getSession, toJson, config, classnames } from '../utils';

const socket = io.connect(config.SOCKET_ADDRESS);

const { prefix, openPages } = config;


const { Header, Bread, Footer, Sider, styles } = Layout;
let lastHref;

const App = ({ children, dispatch, report, loading, location }) => {
  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menu, permissions } = report;
  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const { logo } = config;
  const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname));
  let hasPermission = false;
  if (pathname === '/') {
    hasPermission = true;
  } else {
    hasPermission = current.length ? permissions.visit.includes(current[0].id) : false;
  }
  const href = window.location.href;


  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }
  const headerProps = {
    menu,
    user,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    logout() {
      const loginId = !(toJson(getSession('sessionid')) === 'expired') ? toJson(getSession('sessionid')) : null;
      const msg = {
        header: {
          sessionid: loginId,
        },
        message: {
          path: 'user/logoff',
          args: {},
        },
      };
      socket.emit('event', msg);
      console.log(msg);
    },
    checkLogin() {
      dispatch({ type: 'report/checkLogin' });
    },
    switchMenuPopover() {
      dispatch({ type: 'report/switchMenuPopver' });
    },
    switchSider() {
      dispatch({ type: 'report/switchSider' });
    },
    changeOpenKeys(openKeys) {
      dispatch({ type: 'report/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
  };

  const siderProps = {
    menu,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme() {
      dispatch({ type: 'report/switchTheme' });
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys));
      dispatch({ type: 'report/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
  };
  const breadProps = {
    menu, location,
  };
  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader spinning={false} />
      {children}
    </div>);
  }
  return (
    <div>
      <Helmet>
        <title>ANTD ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
      </Helmet>
      <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
        {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
          <Sider {...siderProps} />
        </aside> : ''}
        <div className={styles.main}>
          <Header {...headerProps} />
          <Bread {...breadProps} />
          <div className={styles.container}>
            <div className={styles.content}>
              <Card bordered={false}>
                {hasPermission ? children : <Error />}
              </Card>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ report, loading }) => ({ report, loading }))(App);
