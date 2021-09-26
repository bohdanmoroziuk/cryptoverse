import { Line } from 'react-chartjs-2';
import { Row, Col, Typography } from 'antd';

import { getChartData } from 'utils/crypto';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const data = getChartData(coinHistory);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    }
  };

  return (
    <div
      className="line-chart"
      style={{ marginTop: '20px' }}  
    >
      <Row className="chart-header">
        <Title
          className="chart-title"
          level={2}
        >
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title
            className="price-change"
            level={5}
          >
            {coinHistory?.data?.change}%
          </Title>
          <Title
            className="current-price"
            level={5}
          >
            Current {coinName} Price: ${currentPrice} 
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
