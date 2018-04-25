/**
 * Date：2018/4/3
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import List from '../../components/Student/Home/list';
import Modal from '../../components/Student/Home/modal';

const Home = ({ dispatch, state }) => {
  const { loading, listData, pagination, modalVisible, currentItem } = state.studentHome;
  const listProps = {
    loading,
    listData,
    pagination,
    onView(e, param) {
      e.preventDefault();
      console.warn(param)
      dispatch({
        type: 'studentHome/showModal',
      });
      dispatch({
        type: 'studentHome/updateState',
        payload: {
          currentItem: param,
        },
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'studentHome/query',
        payload: {
          page: {
            pageno: page.current, // 查看第几页内容 默认1
            rowcount: page.pageSize, // 一页展示条数 默认10
          },
        },
      });
    },
  };

  const modalProps = {
    title: '查看通知',
    modalVisible,
    okText: '确定',
    cancelText: '取消',
    currentItem,
    onConfirm() {
      dispatch({
        type: 'studentHome/hideModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'studentHome/hideModal',
      });
    },
  };

  return (
    <div>
      <List {...listProps} />
      { modalVisible && <Modal {...modalProps} /> }
    </div>
  );
};

Home.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,
};

const mapStateToProps = state => ({ state });
export default connect(mapStateToProps)(Home);
