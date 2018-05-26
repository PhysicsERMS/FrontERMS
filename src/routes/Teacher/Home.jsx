/**
 * Date：2018/4/25
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import List from '../../components/Teacher/Home/list';
import Modal from '../../components/Teacher/Home/modal';
import SubModal from '../../components/Teacher/Home/subModal';

const Home = ({ dispatch, state }) => {
  const {
    loading,
    listData,
    pagination,
    currentItem,
    modalVisible,
    subModalVisible,
  } = state.teacherHome;
  const listProps = {
    loading,
    listData,
    pagination,
    onView(e, param) {
      e.preventDefault();
      dispatch({
        type: 'teacherHome/showModal',
      });
      dispatch({
        type: 'teacherHome/updateState',
        payload: {
          currentItem: param,
        },
      });
    },
    onEdit(e, item) {
      e.preventDefault();
      dispatch({
        type: 'teacherHome/updateState',
        payload: {
          subModalVisible: true,
          currentItem: item,
        },
      });
    },
    onDelete(item) {
      dispatch({
        type: 'teacherHome/delete',
        payload: {
          id: item.id,
        },
      });
    },
    onSub() {
      dispatch({
        type: 'teacherHome/updateState',
        payload: {
          subModalVisible: true,
        },
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'teacherHome/query',
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
        type: 'teacherHome/hideModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'teacherHome/hideModal',
      });
    },
  };

  const subModalProps = {
    title: '查看通知',
    subModalVisible,
    okText: '确定',
    cancelText: '取消',
    currentItem,
    onConfirm(params) {
      if (currentItem.id) {
        dispatch({
          type: 'teacherHome/edit',
          payload: {
            id: currentItem.id,
            title: params.title,
            content: params.content,
          },
        });
      } else {
        dispatch({
          type: 'teacherHome/add',
          payload: {
            title: params.title,
            content: params.content,
          },
        });
      }
      dispatch({
        type: 'teacherHome/updateState',
        payload: {
          subModalVisible: false,
          currentItem: {},
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'teacherHome/updateState',
        payload: {
          subModalVisible: false,
          currentItem: {},
        },
      });
    },
  };

  return (
    <div>
      <List {...listProps} />
      { modalVisible && <Modal {...modalProps} /> }
      { subModalVisible && <SubModal {...subModalProps} /> }
    </div>
  );
};

Home.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,
};

const mapStateToProps = state => ({ state });
export default connect(mapStateToProps)(Home);
