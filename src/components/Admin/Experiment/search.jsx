/**
 * Date：2018/4/26
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Row, Col } from 'antd';


const search = ({
      searchInfo,
      onGetStudents,
      onChange,
      onSearch,
              }) => (
                <div>
                  <Row>
                    <Col span={8}>
                      <Button type="primary" onClick={onGetStudents}>获取实验</Button>
                    </Col>
                    <Col span={8} offset={8}>
                      <Input
                        value={searchInfo}
                        placeholder="实验编号、实验名称查询"
                        onChange={onChange}
                        style={{ width: 190, marginRight: 10 }}
                      />
                      <Button type="primary" onClick={onSearch}>搜索</Button>
                    </Col>
                  </Row>
                </div>
  );

search.propTypes = {
  searchInfo: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

export default search;
