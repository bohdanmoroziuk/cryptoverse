import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';

import { useGetCryptosQuery } from 'services/crypto';

const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery();

  const stats = data?.data?.stats;

  if (isFetching) {
    return 'Loading...';
  }

  return (
    <div className="page">
      <Title className="heading" level={2}>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic 
            title="Total Cryptocurrencies"
            value={stats.total}
          />
        </Col>
        <Col span={12}>
          <Statistic 
            title="Total Exchanges"
            value={millify(stats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic 
            title="Total Market Cap"
            value={millify(stats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic 
            title="Total 24h Volume"
            value={millify(stats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic 
            title="Total Markets"
            value={millify(stats.totalMarkets)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
