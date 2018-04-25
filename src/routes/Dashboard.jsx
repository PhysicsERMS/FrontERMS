// import React, { PropTypes } from 'react';
// import { connect } from 'dva';
// import { Row, Col, Card } from 'antd'
// import DashboardSummary from '../components/Dashboard/summary';
// import DashboardSummaryAmount from '../components/Dashboard/summaryAmout';
// import DashboardSummaryOrder from '../components/Dashboard/summaryOrder';
// import DashboardAmount from '../components/Dashboard/amount';
// import DashboardOrder from '../components/Dashboard/order';
// import DashboardCustom from '../components/Dashboard/custom';


// function Dashboard({location, dashboard}) {
//   const {
//     loading, summaryFirst, summarySecond, summaryThird, summaryFourth, summaryFifth, amount, order, custom,
//   } = dashboard.dashboard;

//   const { queryString } = location.query;

//   const dashboardSummaryProps = {
//     loading,
//     summaryFirst,
//     summarySecond,
//     summaryThird,
//     summaryFourth,
//     summaryFifth,
//   };


//   return (
//     <div>
//       <DashboardSummary {...dashboardSummaryProps} />
//       <Row gutter={24} style={{marginTop:15}}>
//         <Col span={16}>
//           <Card>
//             <DashboardAmount data={amount}/>
//           </Card>
//         </Col>
//         <Col span={4}>
//           <Card className="card-summary">
//             <DashboardSummaryAmount data={summaryFifth}/>
//           </Card>
//         </Col>
//         <Col span={4}>
//           <Card className="card-summary">
//             <DashboardSummaryOrder data={summaryFourth}/>
//           </Card>
//         </Col>
//       </Row>
//       <Row gutter={24} style={{marginTop:15}}>
//         <Col span={12}>
//           <Card>
//             <DashboardOrder data={order}/>
//           </Card>
//         </Col>
//         <Col span={12}>
//           <Card>
//             <DashboardCustom data={custom}/>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// Dashboard.propTypes = {
//   dashboard: PropTypes.object,
//   location: PropTypes.object,
// };

// function mapStateToProps(dashboard) {
//   return {dashboard};
// }

// export default connect(mapStateToProps)(Dashboard);
