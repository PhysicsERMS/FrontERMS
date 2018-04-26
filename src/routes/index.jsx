/**
 * Created by yunbaoyuan on 2017/9/4.
 */
import React from 'react';
import RouterConfig from '../router';
import Login from './Login';
import AHome from './Admin/Home';
import AExperiment from './Admin/Experiment';
import AStudent from './Admin/Student';
import THome from './Teacher/Home';
import TMyExperiment from './Teacher/MyExperiment';
import SHome from './Student/Home';
import SMyExperiment from './Student/MyExperiment';

const routes = [
  // 公共部分
  {
    path: '/login',
    component: Login,
  },
  // 管理员部分
  {
    path: '/admin/home',
    component: AHome,
  },
  {
    path: '/admin/experiment',
    component: AExperiment,
  },
  {
    path: '/admin/student',
    component: AStudent,
  },
  // 教师部分
  {
    path: '/teacher/home',
    component: THome,
  },
  {
    path: '/teacher/myExperiment',
    component: TMyExperiment,
  },
  // 学生部分
  {
    path: '/student/home',
    component: SHome,
  },
  {
    path: '/student/myExperiment',
    component: SMyExperiment,
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
