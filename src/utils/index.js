import lodash from 'lodash';
import classnames from 'classnames';
import config from './config';
import request from './request';
import { color } from './theme';

const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;

/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};

/**
 * 对象转数组，并于map结构
 * @param   {Object} data
 * @return  {Array}
 */
const objToArray = (data) => {
  const toArray = [];
  Object.entities(data).map((item) => {
    if (item[0]) {
      const arr = {
        code: item[0],
        name: item[1],
      };
      toArray.push(arr);
    }
    return null;
  });
  return toArray;
};

/**
 * 提取门店code为字符串
 * @param   {Array} data
 * @return  {String}
 */
const codeToString = (data) => {
  const codeArray = [];
  data.map((item) => {
    if (item) {
      codeArray.push(item.code);
    }
    return null;
  });
  return codeArray.join(',');
};

/**
 * 提取门店name为字符串
 * @param   {Array} data
 * @return  {String}
 */
const nameToString = (data) => {
  const nameArray = [];
  data.map((item) => {
    if (item) {
      nameArray.push(item.name);
    }
    return null;
  });
  return nameArray.join(',');
};
// 构造当前日期
const getDateStr = (dayInterval) => {
  let dd = new Date();
  const yy = dd.getFullYear();
  let MM = dd.getMonth() + 1;// 获取当前月份的日期
  dd.setDate(dd.getDate() + dayInterval);// 获取dayInterval天后的日期
  dd = dd.getDate();
  if (MM < 10) {
    MM = `0${MM}`;
  }
  if (dd < 10) {
    dd = `0${dd}`;
  }
  return `${yy}-${MM}-${dd}`;
};

// 动态提取日期
const getDateList = (list, dynamicParam) => {
  const dateArray = [];
  list.map((item) => {
    if (item[dynamicParam]) {
      Object.keys(item[dynamicParam]).map((key) => {
        if (dateArray.indexOf(key) < 0) { // 如果该元素不在数组中就把该元素加入
          dateArray.push(key);
        }
        return null;
      });
    }
    return null;
  });
  return dateArray;
};

// 抽取动态列里面的字段
const getColList = (list, dynamicParam) => {
  const colArray = [];
  const keyArray = []; // 用于键值去重，因为indexOf检测的是单个元素而不是一个对象
  list.map((item) => {
    if (item[dynamicParam]) {
      Object.keys(item[dynamicParam]).map((key) => {
        if (keyArray.indexOf(key) < 0) { // 如果该元素不在数组中就把该元素加入
          keyArray.push(key); // 把key加入到检测主键是否重复数组
          colArray[key] = [];
        }
        Object.keys(item[dynamicParam][key]).map((sKey) => {
          if (colArray[key].indexOf(sKey) < 0) { // 如果该键不在数组中就把该元素加入
            colArray[key].push(sKey);
          }
          return null;
        });
        return null;
      });
    }
    return null;
  });
  return colArray;
};

// 随机动态提取列子列数量
const getColListLength = (dateData) => {
  let colLength = 0;
  Object.entries(dateData).map((item) => {
    item[1].map((key) => {
      if (key) {
        colLength += 1;
      }
      return null;
    });
    return null;
  });
  return colLength;
};

// 改造列表数据
const dynamicDataChange = (list, dynamicParam) => {
  const dataList = [];
  let i = 0;
  list.map((item) => {
    const itemObj = item;
    if (item[dynamicParam]) { // 如果对象不为空
      Object.entries(item[dynamicParam]).map((sItem) => {
        Object.entries(sItem[1]).map((mItem) => { // 循环里面的键值，以达到动态
          itemObj[sItem[0] + mItem[0]] = mItem[1];
          return null;
        });
        return null;
      });
    }
    itemObj.id = i;
    i += 1;
    dataList.push(itemObj);
    return null;
  });
  return dataList;
};


// 改造普通列表数据，关键是增加行id，list.jsx需要
const commonDataChange = (list) => {
  const dataList = [];
  let i = 0;
  list.map((item) => {
    const itemObj = item;
    itemObj.id = i;
    i += 1;
    dataList.push(itemObj);
    return null;
  });
  return dataList;
};

// json数组去重
const uniqueArray = (data) => {
  const codeArray = []; // 仅用于存放code，便于比较是否重复
  const dataArray = []; // 用于存放最终json数组对象
  data.map((item) => {
    if (codeArray.indexOf(item.code) < 0) { // 如果该元素的code不在数组中就把该元素加入
      codeArray.push(item.code); // item.code加入codeArray数组
      dataArray.push(item); // item加入dataArray数组
    }
    return null;
  });
  return dataArray;
};

// 传入code字符串，删除含这些code的项，返回新数组
const deleteArray = (arrayData, codes) => {
  const dataArray = []; // 用于存放最终json数组对象
  arrayData.map((item) => {
    if (codes.split(',').indexOf(item.code) < 0) { // 如果该元素的code不在删除的code数组里，则新数组里有该项
      dataArray.push(item); // item加入dataArray数组
    }
    return null;
  });
  return dataArray;
};

// 传入code字符串，删除这些codes，返回新数组
const deleteCodes = (codeData, codes) => {
  const dataArray = []; // 用于存放最终json数组对象
  codeData.map((item) => {
    if (codes.split(',').indexOf(item) < 0) { // 如果该元素的code不在删除的code数组里，则新数组里有该项
      dataArray.push(item); // item加入dataArray数组
    }
    return null;
  });
  return dataArray;
};

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  const item = array.filter(_ => _[keyAlias] === key);
  if (item.length) {
    return item[0];
  }
  return null;
};

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  const data = lodash.cloneDeep(array);
  const result = [];
  const hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    const hashVP = hash[item[pid]];
    if (hashVP) {
      if (!hashVP[children]) {
        hashVP[children] = [];
      }
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

const clearLocalStorage = () => {
  window.localStorage.removeItem('userInfo');
};
const toJson = str => JSON.parse(str);
const toStr = json => JSON.stringify(json);

const getLocal = name => localStorage.getItem(name);
const saveLocal = (name, data) => {
  localStorage.setItem(name, data);
};
const delLocal = (name) => {
  localStorage.removeItem(name);
};

const getSession = name => sessionStorage.getItem(name);
const saveSession = (name, data) => {
  sessionStorage.setItem(name, data);
};
const delSession = (name) => {
  sessionStorage.removeItem(name);
};

module.exports = {
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  objToArray,
  codeToString,
  nameToString,
  getDateList,
  getColList,
  getColListLength,
  getDateStr,
  uniqueArray,
  deleteArray,
  deleteCodes,
  commonDataChange,
  dynamicDataChange,
  clearLocalStorage,
  toJson,
  toStr,
  saveLocal,
  getLocal,
  delLocal,
  saveSession,
  getSession,
  delSession,
};
