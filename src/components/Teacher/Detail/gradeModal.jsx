/*
 * @Author: Maiduo
 * @Date: 2018-04-25 13:01:29
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Upload, Input, Button, Icon } from 'antd';


const FormItem = Form.Item;

const modal = ({
  title,
  modalVisible,
  okText,
  cancelText,
  onConfirm,
  onCancel,
  form: {
    getFieldDecorator,
    resetFields,
    validateFields,
    getFieldsValue,
  },
  beforeUpload,
  onChange,
}) => {
  const onOk = () => {
    validateFields((err) => {
      if (err) {
        return;
      }
      const data = {
        ...getFieldsValue(),
      };

      onConfirm(data);
    });
  };

  const modapOpt = {
    title,
    maskClosable: false,
    visible: modalVisible,
    okText,
    cancelText,
    onOk,
    onCancel,
    afterClose: resetFields,
  };
  const uploadProps = {
    name: 'file',
    accept: 'application/pdf',
    multiple: true,
    action: '/teacher/public/mark',
    beforeUpload,
    onChange,
  };
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <Modal {...modapOpt}>
      <Form layout="inline">
        <FormItem label="预习分数" {...formItemLayout}>
          {getFieldDecorator('preScore', {
            rules: [
              {
                required: true, message: '请输入实验预习分数！',
              },
              {
                pattern: /^(\d{1}|[1-9]\d{1}|100)$/, message: '请输入0-100之间的整数!',
              },
            ],
          })(
            <Input />,
          )}
        </FormItem >
        <FormItem label="报告分数" {...formItemLayout}>
          {getFieldDecorator('score', {
            rules: [
              {
                required: true, message: '请输入实验报告分数！',
              },
              {
                pattern: /^(\d{1}|[1-9]\d{1}|100)$/, message: '请输入为0-100之间的整数',
              },
            ],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem label="操作分数" {...formItemLayout}>
          {getFieldDecorator('operateScore', {
            rules: [
              {
                required: true, message: '请输入实验操作分数！',
              },
              {
                pattern: /^(\d{1}|[1-9]\d{1}|100)$/, message: '请输入0-100之间的整数!',
              },
            ],
          })(
            <Input />,
          )}
        </FormItem>
        <br />
        <FormItem label="实验报告" {...formItemLayout} style={{ marginLeft: 10 }}>
          <Upload {...uploadProps} style={{ marginLeft: 10 }}>
            <Button>
              <Icon type="upload" />点击上传
            </Button>
          </Upload>
        </FormItem>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  title: PropTypes.string,
  modalVisible: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  form: PropTypes.object,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  beforeUpload: PropTypes.func,
  onChange: PropTypes.func,
};

export default Form.create()(modal);
