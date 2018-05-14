/**
 * Date：2018/5/5
 * Author：Wangtaidong
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';
import List from '../../components/Teacher/Detail/list';
import Modal from '../../components/Teacher/Detail/gradeModal';


const Detail = ({ dispatch, state }) => {
  const {
    loading,
    listData,
    pagination,
    modalVisible,
    viewUrl,
    subId,
  } = state.teacherDetail;
  const listProps = {
    loading,
    listData,
    pagination,
    onGrade(params) {
      dispatch({
        type: 'teacherDetail/showModal',
      });
      dispatch({
        type: 'teacherDetail/updateState',
        payload: {
          subId: params.id,
        },
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'teacherDetail/query',
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
    title: '打分',
    modalVisible,
    okText: '确定',
    cancelText: '取消',
    onConfirm(params) {
      dispatch({
        type: 'teacherDetail/grade',
        payload: {
          ...params,
          filePath: viewUrl,
          id: subId,
        },
      });
      dispatch({
        type: 'teacherDetail/hideModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'teacherDetail/hideModal',
      });
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        if (!/.*?\.(pdf)$/g.test(file.name)) {
          message.warning(`${file.name} 不是PDF格式.`);
          reject();
        }
        resolve();
      });
    },
    onChange(info) {
      const status = info.file.status;
      if (status === 'done') {
        const res = info.file.response;
        dispatch({
          type: 'teacherDetail/updateState',
          payload: {
            viewUrl: res.filePath,
          },
        });
        message.success(`${info.file.name} 实验报告上传成功.`);
      } else if (status === 'error') {
        message.warning(`${info.file.name} 实验报告上传失败.`);
      }
    },
  };
  return (
    <div>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  );
};

Detail.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Detail);
