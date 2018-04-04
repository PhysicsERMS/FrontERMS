/**
 * Date：2018/4/4
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Divider } from 'antd';

const modal = ({
        title,
        modalVisible,
        currentItem,
        okText,
        cancelText,
        onConfirm,
        onCancel,
               }) => {
  const modapOpt = {
    title,
    width: 700,
    visible: modalVisible,
    okText,
    cancelText,
    onOk: onConfirm,
    onCancel,
  };
  return (
    <div>
      <Modal {...modapOpt}>
        <h4>{currentItem.title}</h4>
        <Divider />
        <blockquote>
          <p>{currentItem.content}</p>
        </blockquote>
      </Modal>
    </div>);
};

modal.propTypes = {
  title: PropTypes.string,
  modalVisible: PropTypes.bool,
  currentItem: PropTypes.object,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default modal;
