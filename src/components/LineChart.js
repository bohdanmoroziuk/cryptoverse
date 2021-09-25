import { Line } from 'react-chartjs-2';
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const history = coinHistory?.data?.history ?? [];

  const timestamps = history
    .map((item) => item.timestamp)
    .map((timestamp) => new Date(timestamp).toLocaleDateString())

  const prices = history
    .map((item) => item.price);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Price in USD',
        data: prices,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

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
