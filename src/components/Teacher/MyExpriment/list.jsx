/**
 * Date：2018/4/2
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';


const list = ({ loading, listData, pagination, onDetail, onPageChange }) => {
  const columns = [{
    title: '实验编号',
    dataIndex: 'id',
  }, {
    title: '实验名称',
    dataIndex: 'name',
  }, {
    title: '教室',
    dataIndex: 'classRoom',
  }, {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: record => (<Button type="primary" size="small" onClick={() => onDetail(record)}>进入实验</Button>),
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
  onDetail: PropTypes.func,
  onPageChange: PropTypes.func,
};

export default list;
