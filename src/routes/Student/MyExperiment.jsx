/**
 * Date：2018/4/24
 * Author：Wangtaidong
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';
import List from '../../components/Student/MyExpriment/list';
import SubModal from '../../components/Student/MyExpriment/subModal';
import ViewModal from '../../components/Student/MyExpriment/viewModal';

const Experiment = ({ dispatch, state }) => {
  const {
    loading,
    listData,
    pagination,
    subModalVisible,
    viewModalVisible,
    fileUrl,
    page,
    pages,
    fileId,
    temUrl,
  } = state.studentExperiment;
  const listProps = {
    loading,
    listData,
    pagination,
    onSubmit(params) {
      dispatch({
        type: 'studentExperiment/showModal',
        payload: {
          subModalVisible: true,
          fileId: params.id,
          temUrl: params.viewUrl,
        },
      });
    },
    onView(params) {
      dispatch({
        type: 'studentExperiment/updateState',
        payload: {
          fileUrl: params.viewUrl,
        },
      });
      dispatch({
        type: 'studentExperiment/showModal',
        payload: {
          viewModalVisible: true,
        },
      });
    },
    onPageChange(pagese) {
      dispatch({
        type: 'studentExperiment/query',
        payload: {
          page: {
            current: pagese.current, // 查看第几页内容 默认1
            pageSize: pagese.pageSize, // 一页展示条数 默认10
          },
        },
      });
    },
  };
  const subModalProps = {
    title: '提交报告',
    subModalVisible,
    okText: '确定',
    cancelText: '取消',
    onConfirm() {
      dispatch({
        type: 'studentExperiment/hideModal',
        payload: {
          subModalVisible: false,
        },
      });
      dispatch({
        type: 'studentExperiment/saveUrl',
        payload: {
          id: fileId,
          filePath: temUrl,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'studentExperiment/hideModal',
        payload: {
          subModalVisible: false,
        },
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
      // if (status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      if (status === 'done') {
        const res = info.file.response;
        dispatch({
          type: 'studentExperiment/updateState',
          payload: {
            temUrl: res.filePath,
          },
        });
        message.success(`${info.file.name} 实验报告上传成功.`);
      } else if (status === 'error') {
        message.warning(`${info.file.name} 实验报告上传失败.`);
      }
    },
  };
  const viewModalProps = {
    fileUrl,
    title: '查看反馈',
    viewModalVisible,
    okText: '确定',
    cancelText: '取消',
    page,
    pages,
    onConfirm() {
      dispatch({
        type: 'studentExperiment/hideModal',
        payload: {
          viewModalVisible: false,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'studentExperiment/hideModal',
        payload: {
          viewModalVisible: false,
        },
      });
    },
    onDocumentComplete(pages) {
      dispatch({
        type: 'studentExperiment/updateState',
        payload: { page: 1, pages },
      });
    },
    onPageComplete(page) {
      dispatch({
        type: 'studentExperiment/updateState',
        payload: { page },
      });
    },
    handlePrevious() {
      dispatch({
        type: 'studentExperiment/updateState',
        payload: { page: page - 1 },
      });
    },
    handleNext() {
      dispatch({
        type: 'studentExperiment/updateState',
        payload: { page: page + 1 },
      });
    },
  };
  return (
    <div>
      <List {...listProps} />
      {subModalVisible && <SubModal {...subModalProps} />}
      {viewModalVisible && <ViewModal {...viewModalProps} />}
    </div>
  );
};

Experiment.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Experiment);
