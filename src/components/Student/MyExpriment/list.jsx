/**
 * Date：2018/4/24
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Badge  } from 'antd';


const list = ({ loading, listData, pagination, onPageChange }) => {
  const columns = [{
    title: '实验编号',
    dataIndex: 'id',
  }, {
    title: '实验名称',
    dataIndex: 'name',
  }, {
    title: '教室',
    dataIndex: 'room',
  }, {
    title: '上课时间',
    dataIndex: 'classTime',
  }, {
    title: '状态',
    dataIndex: '',
    key: 'status',
    render: (record) => {
      let text = <Badge status="default" text="未提交" />;
      if (record.status === 1) {
        text = <Badge status="processing" text="已提交" />;
      } else if (record.status === 2) {
        text = <Badge status="success" text="已反馈" />;
      }
      return text;
    }
  }, {
    title: '分数',
    dataIndex: '',
    key: 'score',
    render: (record) => {
      if (record.status === 2) {
        return record.score;
      }
      return '无';
    }
  }, {
    title: '实验预习',
    dataIndex: '',
    key: 'preview',
    render: (record) => {
      if (record.preStatus === 1) {
        return '已预习';
      }
      return <a href="#">预习</a>;
    }
  }, {
    title: '操作',
    dataIndex: '',
    key: 'option',
    render: (record) => {
      let subBtn = <Button type="primary" size="small">提交报告</Button>;
      let viewBtn = <Button type="primary" size="small" disabled>查看反馈</Button>;
      if (record.status === 1) {
        subBtn = <Button type="primary" size="small" disabled>提交报告</Button>;
      } else if (record.status === 2) {
        subBtn = <Button type="primary" size="small" disabled>提交报告</Button>;
        viewBtn = <Button type="primary" size="small">查看反馈</Button>;
      }
     return (<div>
      {subBtn} {viewBtn}
    </div>)
    },
  }];
  return (
    <div>
      <Table
        style={{ marginTop: 10 }}
        dataSource={listData}
        columns={columns}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.id}
      />
    </div>
  );
};

list.propTypes = {
  loading: PropTypes.bool,
  listData: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
};

export default list;
