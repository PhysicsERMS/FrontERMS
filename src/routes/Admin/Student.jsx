/**
 * Date：2018/4/2
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import List from '../../components/Admin/Student/list';
import Search from '../../components/Admin/Student/search';

const Student = ({ dispatch, state }) => {
  const { loading, searchInfo, status, listData, pagination } = state.adminStudent;

  const searchProps = {
    searchInfo,
    status,
    // onSelect(value) {
    //   dispatch({
    //     type: 'adminStudent/updateState',
    //     payload: {
    //       status: value,
    //     },
    //   });
    // },
    onChange(value) {
      dispatch({
        type: 'adminStudent/updateState',
        payload: {
          searchInfo: value,
        },
      });
    },
    onSearch(value) {
      dispatch({
        type: 'adminStudent/query',
        payload: {
          page: {
            pageno: 1, // 查看第几页内容 默认1
            rowcount: 10, // 一页展示条数 默认10
            orderby: {},
          },
          key: value,
        },
      });
    },
  };

  const listProps = {
    loading,
    listData,
    pagination,
    onPageChange(page) {
      dispatch({
        type: 'adminStudent/query',
        payload: {
          page: {
            pageno: page.current, // 查看第几页内容 默认1
            rowcount: page.pageSize, // 一页展示条数 默认10
          },
          key: searchInfo,
        },
      });
    },

  };
  return (
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
    </div>
  );
};

Student.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,

};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Student);
