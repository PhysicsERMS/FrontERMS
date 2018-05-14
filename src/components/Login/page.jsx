import React, { PropTypes } from 'react';
import { Button, Row, Form, Input, Select } from 'antd';
import { config } from '../../utils';
import styles from '../../common/login.less';

const FormItem = Form.Item;
const Option = Select.Option;

const page = ({
  loading,
  onLogin,
  onSelect,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return false;
      }
      onLogin(values);
      return true;
    });
  }
  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <span className={styles.imgs} />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" onPressEnter={handleOk} placeholder="密码" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('identity', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Select placeholder="选择一种身份" onSelect={onSelect}>
            <Option value="admin">管理员</Option>
            <Option value="teacher">老师</Option>
            <Option value="student">学生</Option>
          </Select>)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loading}>
            登录
          </Button>
          <p>
            <span>{config.footerText}</span>
          </p>
        </Row>

      </form>
    </div>
  );
};

page.propTypes = {
  loading: PropTypes.bool,
  form: PropTypes.object,
  onLogin: PropTypes.func,
  onSelect: PropTypes.func,
};

export default Form.create()(page);
