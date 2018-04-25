/**
 * Date：2018/4/24
 * Author：Wangtaidong
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import List from '../../components/Student/MyExpriment/list';

const Experiment = ({ dispatch, state }) => {
  const { loading, listData, pagination } = state.studentExperiment;

  const listProps = {
    loading,
    listData,
    pagination,
    onPageChange(page) {
      dispatch({
        type: 'studentExperiment/query',
        payload: {
          page: {
            pageno: page.current, // 查看第几页内容 默认1
            rowcount: page.pageSize, // 一页展示条数 默认10
          },
        },
      });
    },

  };
  return (
    <div>
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
