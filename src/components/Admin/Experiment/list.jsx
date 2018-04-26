/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';


const list = ({ loading, listData, pagination, onPageChange }) => {
  const columns = [{
    title: '实验编号',
    dataIndex: 'id',
  }, {
    title: '实验名称',
    dataIndex: 'name',
  }, {
    title: '负责老师',
    dataIndex: 'teacherName',
  }, {
    title: '教室',
    dataIndex: 'classRoom',
  }, {
    title: '操作',
    dataIndex: '',
    key: 'option',
    render: () => (<div><a href="#">编辑</a> | <a href="#">删除</a></div>),
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
