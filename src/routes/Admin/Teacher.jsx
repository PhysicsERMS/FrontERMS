/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import List from '../../components/Admin/Teacher/list';
import Search from '../../components/Admin/Teacher/search';

const Teacher = ({ dispatch, state }) => {
  const { loading, searchInfo, listData, pagination } = state.adminTeacher;

  const searchProps = {
    searchInfo,
    onGetStudents() {
      dispatch({
        type: 'adminTeacher/getTeachers',
      });
    },
    onChange(value) {
      dispatch({
        type: 'adminTeacher/updateState',
        payload: {
          searchInfo: value,
        },
      });
    },
    onSearch(value) {
      dispatch({
        type: 'adminTeacher/query',
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
        type: 'adminTeacher/query',
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

Teacher.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,

};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Teacher);
