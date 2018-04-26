/**
 * Date：2018/4/25
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Button, Row, Col } from 'antd';
import { cutStr } from '../../../utils/index';

const list = ({ loading, listData, onView }) => {
  return (
    <div>
      <Row>
        <Col span={2} offset={22}>
          <Button type="primary" size="small">发布通知</Button>
        </Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={listData}
        loading={loading}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon="notification" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} />}
              title={<a onClick={(e) => { onView(e, item); }}><h4>{item.title}</h4></a>}
              description={cutStr(item.content, 60)}
            />
            <div>{item.time} By {item.teacherName}</div>
          </List.Item>
        )}
      />
    </div>);
};

list.propTypes = {
  loading: PropTypes.bool,
  listData: PropTypes.array,
  onView: PropTypes.func,
};

export default list;
