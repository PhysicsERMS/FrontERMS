/**
 * Date：2018/5/5
 * Author：Wangtaidong
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import List from '../../components/Teacher/Detail/list';

const Detail = ({ dispatch, state }) => {
  const { loading, listData, pagination } = state.teacherDetail;

  const listProps = {
    loading,
    listData,
    pagination,
    onDownload() {
      console.log('download');
    },
    onGrade() {
      console.log('grade');
    },
    onPageChange(page) {
      dispatch({
        type: 'teacherExperiment/query',
        payload: {
          page: {
            current: page.current, // 查看第几页内容 默认1
            pageSize: page.pageSize, // 一页展示条数 默认10
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

Detail.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Detail);
