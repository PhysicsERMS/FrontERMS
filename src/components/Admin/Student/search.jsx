/**
 * Date：2018/4/2
 * Author：Wangtaidong
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Row, Col } from 'antd';


const search = ({
      searchInfo,
      // onSelect,
      onChange,
      onSearch,
              }) => (
                <div>
                  <Row>
                    <Col span={8} offset={16}>
                      <Input
                        value={searchInfo}
                        placeholder="学号、姓名查询 "
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
