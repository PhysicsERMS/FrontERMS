/**
 * Created by yunbaoyuan on 2017/9/4.
 */
import React from 'react';
import RouterConfig from '../router';
import Login from './Login';
import AHome from './Admin/Home';
import AStudent from './Admin/Student';
import TMyExperiment from './Teacher/MyExperiment';

const routes = [
  {
    path: '/login',
    component: Login,
  }, {
    path: '/admin/home',
    component: AHome,
  },
  {
    path: '/admin/student',
    component: AStudent,
  },
  {
    path: '/teacher/myExperiment',
    component: TMyExperiment,
  },
];

const Router = ({ history, app }) => {
  const routerProps = {
    history,
    app,
    routes,
  };

  return <RouterConfig {...routerProps} />;
};

export default Router;
