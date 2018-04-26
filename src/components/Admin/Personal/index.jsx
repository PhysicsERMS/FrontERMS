/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Tag } from 'antd';


const personal = ({ name, email, phone, onChangePass }) => {
  const itemStyle = {
    marginTop: 14,
    fontSize: '14px',
  };
  return (
    <div>
      <Row>
        <Col span={8}>
          <div style={itemStyle}><Tag>用户名</Tag>：{name}</div>
          <div style={itemStyle}><Tag>邮箱</Tag>：{email}</div>
        </Col>
        <Col span={8} offset={4}>
          <div style={itemStyle}><Tag>电话</Tag>：{phone}</div>
        </Col>
      </Row>
      <Row>
        <Col span={4} offset={20}>
          <Button type="primary" onClick={onChangePass}>更改密码</Button>
        </Col>
      </Row>
    </div>
  );
};

personal.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  onChangePass: PropTypes.func,
};

export default personal;
