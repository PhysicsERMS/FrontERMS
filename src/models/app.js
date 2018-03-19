import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { logout, menuList, hasPower, queryAuthority } from '../services/app';
import { makeMenu, getUserInfo, toJson, saveLocal, getLocal, getSession, toStr, config, saveSession, delSession } from '../utils/';
import io from '../utils/socket.io';

const { prefix } = config;
const localStorage = window.localStorage;
const document = window.document;
const location = window.location;
const winWidth = window.innerWidth || document.documentElement.clientWidth
                  || document.body.clientWidth;
const socket = io.connect(config.SOCKET_ADDRESS);

export default {
  namespace: 'report',
  state: {
    user: {},
    isLogin: false,
    permissions: {
      visit: ['1'],
    },
    menu: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Dashboard',
        route: '/dashboard',
      },
    ],
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: true, // 风格定为深色
    isNavbar: winWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    // 基础资料
    baseInfo: {
      shifts: [], // 班次
      sitetype: [], // 台位
      acttype: [], // 活动类别
      loss: [
        { code: '', name: '全部' },
        { code: 'y', name: '已损' },
        { code: 'n', name: '未损' },
      ], // 损失情况

      retreat: [], // 退菜类型
      packagetype: [], // 套餐类别

      period: [
        { code: '30', name: '30' },
        { code: '60', name: '60' },
      ], // 时段
      department: [], // 部门
      dishcatelg: [], // 菜品大类
      isholiday: [
        { code: '', name: '全部' },
        { code: '1', name: '节假日' },
        { code: '0', name: '非节假日' },
      ], // 假日类型
      retreatdish: [
        { code: '', name: '全部' },
        { code: '0', name: '退菜' },
        { code: '1', name: '取消' },
      ], // 消退菜类型
      querymode: [
        { code: '', name: '全部' },
        { code: '1', name: '部门' },
        { code: '2', name: '大类' },
        { code: '3', name: '小类' },
      ], // 查询方式
      dimension: [
        { code: '', name: '全部' },
        { code: '1', name: '按周' },
        { code: '2', name: '按月' },
      ],
      store: [], // 门店
      time: [
        { code: '', name: '全部' },
        { code: '1', name: '按日汇总' },
        { code: '2', name: '按星期汇总' },
        { code: '3', name: '按周汇总' },
        { code: '4', name: '按月汇总' },
        { code: '5', name: '按季度汇总' },
        { code: '6', name: '按半年汇总' },
        { code: '7', name: '按年汇总' },
      ], // 时间段
    },
    brandTree: [], // 树形目录,
  },
  subscriptions: {
    setup({ dispatch }) {
      // 设定模块subscription的emit事件的flag
      saveSession('groupActivityFlag', 'yes');
      saveSession('groupIncomeFlag', 'yes');
      saveSession('dishesSoldFlag', 'yes');
      saveSession('rateDishesFlag', 'yes');
      saveSession('storeCashierFlag', 'yes');

      saveSession('siteSaleFlag', 'yes');
      saveSession('groupRecessionFlag', 'yes');
      saveSession('operatingIncomeFlag', 'yes');
      saveSession('revenueFlag', 'yes');
      saveSession('hourAnalysisFlag', 'yes');

      saveSession('cashBenefitFlag', 'yes');
      saveSession('groupBusinessFlag', 'yes');
      saveSession('tableStatisticsFlag', 'yes');
      saveSession('packageSalesFlag', 'yes');
      saveSession('billAnalysisFlag', 'yes');

      saveSession('antiSettlementFlag', 'yes');

      let tid;
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' });
        }, 300);
      };
      // 监听socket断了连接重新连接
      socket.on('disconnect', () => {
        // console.log("disconnect");
        socket.open();
      });
      socket.on('connect', () => {
        // console.log("connect");
      });
      socket.on('connect_error', (error) => {
        console.log(error);
        dispatch(routerRedux.push('/login'));
      });
      socket.on('connect_timeout', (timeout) => {
        console.log(timeout);
        socket.open();
      });
      socket.on('error', (error) => {
        console.log(error);
        dispatch(routerRedux.push('/login'));
      });
      socket.on('reconnect', (attemptNumber) => {
        console.log(attemptNumber);
      });
      socket.on('reconnect_attempt', (attemptNumber) => {
        console.log(attemptNumber);
      });
      socket.on('reconnecting', (attemptNumber) => {
        console.log(attemptNumber);
      });
      socket.on('reconnect_error', (error) => {
        console.log(error);
      });
      socket.on('reconnect_failed', () => {
        console.log('reconnect_failed');
      });
      socket.on('ping', () => {
        console.log('ping');
      });
      socket.on('pong', (latency) => {
        console.log(latency);
      });
      // 监听退出登录
      socket.on('event', (data) => {
        if (data.header.status === 'unlogin' && data.message.result === 'SUCCESS') {
          // 存储sessionid，user，groupcode至session中
          delSession('sessionid');
          delSession('user');
          delSession('groupcode');
          message.success('退出成功！');
          if (!getSession('user') && location.pathname !== '/login') {
            dispatch(routerRedux.push('/login'));
          }
        } else if (data.header.status === 'error') {
          message.error(data.message.result, 3);
        }
      });
    },
    socketMessage({ dispatch }) {
      dispatch({ type: 'getLocalBaseInfo' });
    },
  },
  effects: {
    * changeNavbar({ payload }, { put, select }) {
      const { report } = yield (select(_ => _));
      const isNavbar = winWidth < 769;
      if (isNavbar !== report.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar });
      }
    },

    // 从缓存读取基础资料
    * getLocalBaseInfo(payload, { put, select }) {
      const { report } = yield (select(_ => _));
      if ((getLocal('baseInfo') && getLocal('store')) || getLocal('brandTree')) {
        const cacheBaseInfo = toJson(getLocal('baseInfo'));
        const cacheStore = { store: toJson(getLocal('store')) };
        const cacheBrandTree = toJson(getLocal('brandTree'));
        // 存入state
        yield put({
          type: 'updateState',
          payload: {
            baseInfo: { ...report.baseInfo, ...cacheBaseInfo, ...cacheStore },
            brandTree: [...report.brandTree, ...cacheBrandTree],
          },
        });
      }
    },
    // 登陆检测
    * checkLogin(payload, { put }) {
      const user = getSession('user');
      if (!user) {
        window.location = `${location.origin}/index.html#/login`;
        yield put({ type: 'updateState', payload: { isLogin: false } });
      }
    },


    * getMenuList(payload, { put, call }) {
      const { data } = yield call(menuList);
      // 有菜单权限 并且 已经完善商户信息 才展示菜单
      if (data.success && getUserInfo().tenName) {
        yield put({
          type: 'showMenu',
          menuData: makeMenu(data.data),
        });
      } else {
        yield put({ type: 'hideMenu' });
      }
    },
    * queryAuthority(payload, { put, call }) {
      const { data } = yield call(queryAuthority);
      if (data.success) {
        if (data.data.status === 2) {
          yield put({
            type: 'hideMenu',
          });
        } else {
          yield put({
            type: 'showMenus',
          });
          yield put({
            type: 'getMenuList',
          });
        }
      }
    },

    * getPower(payload, { call, put }) {
      const { data } = yield call(hasPower);

      if (data.success) {
        yield put({
          type: 'showItem',
          hasItemPower: (data.data === 1),
        });
      }
    },

    * getBaseInfo(payload, { put, select }) {
      const { report } = yield (select(_ => _));
      const baseInfoData = payload.payload.message.infos;
      const baseInfo = {};
      // 处理数据,加入store

      baseInfo.shifts = baseInfoData.SFTCODE;// 班次
      baseInfo.shifts.unshift({ code: '', name: '全部' });

      baseInfo.sitetype = baseInfoData.SITETYPECODE;// 台位
      baseInfo.sitetype.unshift({ code: '', name: '全部' });

      baseInfo.acttype = baseInfoData.FOLIOPAYMENTS_ACTTYPMINCODE;// 活动类别
      baseInfo.acttype.unshift({ code: '', name: '全部' });

      baseInfo.retreat = baseInfoData.ORDERS_VVOIDRSN;// 退菜类型
      baseInfo.retreat.unshift({ code: '', name: '全部' });

      baseInfo.packagetype = baseInfoData.ORDERS_PACKAGETYPECODE;// 套餐类型
      baseInfo.packagetype.unshift({ code: '', name: '全部' });

      baseInfo.department = baseInfoData.ORDERS_DEPTCODE;// 部门
      baseInfo.department.unshift({ code: '', name: '全部' });

      baseInfo.dishcatelg = baseInfoData.ORDERS_GRPTYPCODE;// 菜品大类
      // 存入localStorage
      saveLocal('baseInfo', toStr(baseInfo));

      // 存入state
      yield put({
        type: 'updateState',
        payload: {
          baseInfo: { ...report.baseInfo, ...baseInfo },
        },
      });
    },

    * getStoreInfo(payload, { put, select }) {
      const { report } = yield (select(_ => _));
      const store = payload.payload;
      // 存入localStorage
      saveLocal('store', toStr(store));
      // 存入state
      yield put({
        type: 'updateState',
        payload: {
          baseInfo: { ...report.baseInfo, store },
        },
      });
    },

    * getBrandTree(payload, { put }) {
      const brandTreeData = payload.payload.message.infos;

      let brandTree = [];
      // 处理数据,加入store

      brandTree = brandTreeData; // 树形

      // 存入localStorage
      saveLocal('brandTree', toStr(brandTree));

      // 存入state
      yield put({
        type: 'updateState',
        payload: {
          brandTree: [...brandTree],
        },
      });
    },

    * logOut(payload, { put, call }) {
      const { data } = yield call(logout);
      if (data.success) {
        yield put({ type: 'logoutAct' });
      } else {
        message.error('退出失败！');
      }
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    switchSider(state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },

    switchTheme(state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    },

    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },

    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      };
    },

    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
  },
};
