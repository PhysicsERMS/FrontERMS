/*
 * @Author: Maiduo
 * @Date: 2018-04-25 13:01:29
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Upload, Icon } from 'antd';

const Dragger = Upload.Dragger;

const modal = ({
  title,
  subModalVisible,
  okText,
  cancelText,
  onConfirm,
  onCancel,
  onChange,
  beforeUpload,
         }) => {
  const modapOpt = {
    title,
    visible: subModalVisible,
    okText,
    cancelText,
    onOk: onConfirm,
    onCancel,
  };
  const uploadProps = {
    name: 'file',
    accept: 'application/pdf',
    multiple: true,
    action: '/student/public/report',
    beforeUpload,
    onChange,
  };
  return (
    <Modal {...modapOpt}>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">点击或拖动文件到这个区域上传</p>
        <p className="ant-upload-hint">只支持单个文件上传，文件格式必须是PDF</p>
      </Dragger>
    </Modal>
  );
};

modal.propTypes = {
  title: PropTypes.string,
  subModalVisible: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  beforeUpload: PropTypes.func,
};

export default modal;
