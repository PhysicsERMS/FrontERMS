/**
 * Date：2018/4/25
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Button, Row, Col, Popconfirm } from 'antd';
import moment from 'moment';
import { cutStr } from '../../../utils/index';

const list = ({ loading, listData, onView, onEdit, onDelete, onSub }) => {
  const cancel = () => { };
  const confirm = (item) => {
    onDelete(item);
  };
  return (
    <div>
      <Row>
        <Col span={2} offset={22}>
          <Button type="primary" size="small" onClick={() => onSub()}>发布通知</Button>
        </Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={listData}
        loading={loading}
        renderItem={item => (
          <List.Item
            actions={[
              <a onClick={e => onEdit(e, item)}>编辑</a>,
              <Popconfirm
                title="确定删除吗?"
                onConfirm={() => confirm(item)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <a>删除</a>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon="notification" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} />}
              title={<a onClick={(e) => { onView(e, item); }}><h4>{item.title}</h4></a>}
              description={cutStr(item.content, 60)}
            />
            <div>{moment(Number(item.createTime)).format('L')} By {item.teacherName}</div>
          </List.Item>
        )}
      />
    </div>);
};

list.propTypes = {
  loading: PropTypes.bool,
  listData: PropTypes.array,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onSub: PropTypes.func,
};

export default list;
