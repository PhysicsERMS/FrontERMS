import React, { PropTypes } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Container from '../common/Layout/Container'

function list({
  data
}) {
  return (
    <div className="components-dashboard">
      <h5>单位：人</h5>
      <Container>
      <BarChart data={data} margin={{
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
        <Bar dataKey="今天" fill="#3CB371" isAnimationActive={false} />
      </BarChart>
      </Container>
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
