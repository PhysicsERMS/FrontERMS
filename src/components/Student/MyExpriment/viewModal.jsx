/*
 * @Author: Maiduo
 * @Date: 2018-04-25 13:01:29
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';


const modal = ({
                 fileUrl,
                 title,
                 viewModalVisible,
                 okText,
                 cancelText,
                 onConfirm,
                 onCancel,
               }) => {
  const modapOpt = {
    title,
    width: 800,
    maskClosable: false,
    visible: viewModalVisible,
    okText,
    cancelText,
    onOk: onConfirm,
    onCancel,
  };
  return (
    <Modal {...modapOpt}>
      <iframe src={fileUrl} width="100%" height="100%">
        此浏览器不支持在线预览，请下载后查看: <a href={fileUrl}>Download PDF</a>
      </iframe>
    </Modal>
  );
};

modal.propTypes = {
  fileUrl: PropTypes.string,
  title: PropTypes.string,
  viewModalVisible: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default modal;
