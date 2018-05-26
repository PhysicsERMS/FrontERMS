/**
 * Date：2018/4/3
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import List from '../../components/Admin/Home/list';
import Modal from '../../components/Admin/Home/modal';

const Home = ({ dispatch, state }) => {
  const { loading, listData, pagination, modalVisible, currentItem } = state.adminHome;
  const listProps = {
    loading,
    listData,
    pagination,
    onView(e, param) {
      e.preventDefault();
      dispatch({
        type: 'adminHome/showModal',
      });
      dispatch({
        type: 'adminHome/updateState',
        payload: {
          currentItem: param,
        },
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'adminHome/query',
        payload: {
          page: {
            current: page.current, // 查看第几页内容 默认1
            pageSize: page.pageSize, // 一页展示条数 默认10
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
        type: 'adminHome/hideModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'adminHome/hideModal',
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
