/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import List from '../../components/Admin/Experiment/list';
import Search from '../../components/Admin/Experiment/search';

const Experiment = ({ dispatch, state }) => {
  const { loading, searchInfo, listData, pagination } = state.adminExperiment;

  const searchProps = {
    searchInfo,
    onGetStudents() {
      dispatch({
        type: 'adminExperiment/getExperiments',
      });
    },
    onChange(value) {
      dispatch({
        type: 'adminExperiment/updateState',
        payload: {
          searchInfo: value,
        },
      });
    },
    onSearch(value) {
      dispatch({
        type: 'adminExperiment/query',
        payload: {
          page: {
            current: 1, // 查看第几页内容 默认1
            pageSize: 10, // 一页展示条数 默认10
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
        type: 'adminExperiment/query',
        payload: {
          page: {
            current: page.current, // 查看第几页内容 默认1
            pageSize: page.pageSize, // 一页展示条数 默认10
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

Experiment.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Experiment);
