/**
 * Date：2018/4/2
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Badge } from 'antd';


const list = ({ loading, listData, pagination, onPageChange, onGrade }) => {
  const columns = [{
    title: '学号',
    dataIndex: 'num',
  }, {
    title: '姓名',
    dataIndex: 'name',
  }, {
    title: '学院',
    dataIndex: 'college',
  }, {
    title: '班级',
    dataIndex: 'class',
  }, {
    title: '联系方式',
    dataIndex: 'phone',
  },
  // }, {
  //   title: '预习情况',
  //   dataIndex: '',
  //   key: 'preview',
  //   render: (record) => {
  //     if (record.preStatus === '1') {
  //       return <a href="#">查看</a>;
  //     }
  //     return '未预习';
  //   },
  // }, {
  {
    title: '状态',
    dataIndex: '',
    key: 'status',
    render: (record) => {
      let text = <Badge status="default" text="未提交" />;
      if (record.status === '1') {
        text = <Badge status="processing" text="已提交" />;
      } else if (record.status === '2') {
        text = <Badge status="success" text="已反馈" />;
      }
      return text;
    },
  }, {
    title: '操作',
    dataIndex: '',
    key: 'option',
    render: (record) => {
      let downBtn = <Button type="primary" size="small" disabled>下载报告</Button>;
      let gradeBtn = <Button type="primary" size="small" disabled>反馈</Button>;
      if (record.status === '1') {
        downBtn = <Button type="primary" size="small"><a href={record.downloadUrl} download>下载报告</a></Button>;
        gradeBtn = <Button type="primary" size="small" onClick={() => onGrade(record)}>反馈</Button>;
      } else if (record.status === '2') {
        downBtn = <Button type="primary" size="small"><a href={record.downloadUrl} download>下载报告</a></Button>;
        gradeBtn = <Button type="primary" size="small" disabled>反馈</Button>;
      }
      return (<div>
        {downBtn} {gradeBtn}
      </div>);
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
  onGrade: PropTypes.func,
};

export default list;
