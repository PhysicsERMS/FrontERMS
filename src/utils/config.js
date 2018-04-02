const APIV1 = '/api/v1';
const APIV2 = '/api/v2';


module.exports = {
  name: '验数据处理系统',
  prefix: 'rt-report',
  footerText: 'UPC大学物理实验数据处理系统 v1.0',
  SOCKET_ADDRESS: 'http://rtreport.choicesaas.cn:9789',
  // SOCKET_ADDRESS: '30.87.242.24:8081',
  // SOCKET_ADDRESS: '30.87.245.31:8081',
  logo: './images/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
};
