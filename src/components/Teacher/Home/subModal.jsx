/*
 * @Author: Maiduo
 * @Date: 2018-05-26 12:35:02
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

const modal = ({
        title,
        subModalVisible,
        currentItem,
        okText,
        cancelText,
        onConfirm,
        onCancel,
        form: {
          getFieldDecorator,
          validateFields,
        },
               }) => {
  const onOk = () => {
    validateFields((err, values) => {
      if (!err) {
        onConfirm(values);
      }
    });
  };
  const modapOpt = {
    title,
    width: 700,
    visible: subModalVisible,
    okText,
    cancelText,
    onOk,
    onCancel,
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };
  return (
    <div>
      <Modal {...modapOpt}>
        <Form>
          <FormItem label="标题" {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: currentItem.title,
              rules: [{ required: true, message: '请输入标题!' }],
            })(<Input placeholder="标题" />)}
          </FormItem>
          <FormItem label="标题" {...formItemLayout}>
            {getFieldDecorator('content', {
              initialValue: currentItem.content,
            })(<Input.TextArea type="textarea" />)}
          </FormItem>
        </Form>
      </Modal>
    </div>);
};

modal.propTypes = {
  title: PropTypes.string,
  subModalVisible: PropTypes.bool,
  currentItem: PropTypes.object,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.object,
};

export default Form.create()(modal);
