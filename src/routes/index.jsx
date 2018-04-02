/**
 * Created by yunbaoyuan on 2017/9/4.
 */
import RouterConfig from '../router';

const routes = [
  {
    path: '/login',
    component: require('./Login'),
  }, {
    path: '/dashboard',
    component: require('./Dashboard'),
  },
  {
    path: '/admin/student',
    component: require('./Admin/Student'),
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
