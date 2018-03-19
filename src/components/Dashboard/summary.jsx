import React, { PropTypes } from 'react'
import { Row, Col, Card } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Container from '../common/Layout/Container'

function list({
  summaryFirst,
  summarySecond,
  summaryThird,
}) {
  return (
    <div className="components-dashboard">
      <Row  gutter={24}>
        <Col span={9}>
          <Card  className="card-summary">
            <h5>单位：元</h5>
            <Container>
            <BarChart data={summaryFirst} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="昨天" fill="#8884d8" isAnimationActive={false} />
              <Bar dataKey="今天" fill="#82ca9d" isAnimationActive={false} />
            </BarChart>
            </Container>
          </Card>
        </Col>
        <Col span={9}>
          <Card  className="card-summary">
            <h5>单位：元</h5>
            <Container>
              <BarChart data={summarySecond} margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="昨天" fill="#8884d8" isAnimationActive={false} />
                <Bar dataKey="今天" fill="#FF8C00" isAnimationActive={false} />
              </BarChart>
            </Container>
          </Card>
        </Col>
        <Col span={6}>
          <Card  className="card-summary">
            <h5>单位：%</h5>
            <Container>
              <BarChart data={summaryThird} margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="昨天" fill="#8884d8" isAnimationActive={false} />
                <Bar dataKey="今天" fill="#82ca9d" isAnimationActive={false} />
              </BarChart>
            </Container>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

list.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  onPageSizeChange: PropTypes.func,
};

export default list
