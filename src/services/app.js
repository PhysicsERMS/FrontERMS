import request from '../utils/request';

export function logout() {
  return request('/ipos-chains/logout');
}

export function menuList() {
  return request('/ipos-chains/menu/list');
}

export function hasPower() {
  return request('/ipos-chains/cre/hasPower');
}

export function queryAuthority() {
  return request('/ipos-chains/aclStore/queryAuthority');
}

