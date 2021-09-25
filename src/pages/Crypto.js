import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { Row, Col, Typography, Select } from 'antd';
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { 
  MoneyCollectOutlined, 
  DollarCircleOutlined, 
  FundOutlined, 
  ExclamationCircleOutlined, 
  StopOutlined, 
  TrophyOutlined, 
  CheckOutlined, 
  NumberOutlined, 
  ThunderboltOutlined
} from '@ant-design/icons';

import { useGetCryptoQuery } from 'services/crypto';

const { Title, Text } = Typography;
const { Option } = Select;

const Crypto = () => {
  const { coinId } = useParams();

  const { data, isFetching } = useGetCryptoQuery({ id: coinId });

  const [timePeriod, setTimePeriod] = useState('7d');

  if (isFetching) {
    return 'Loading...';
  }

  const crypto = data?.data?.coin;

  const timePeriods = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${crypto.price && millify(crypto.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: crypto.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${crypto.volume && millify(crypto.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${crypto.marketCap && millify(crypto.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(crypto.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: crypto.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: crypto.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: crypto.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(crypto.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(crypto.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title
          className="coin-name"
          level={2}
        >
          {crypto.name} ({crypto.slug}) Price
        </Title>
        <p>
          {crypto.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
      <Select
        className="select-timeperiod"
        defaultValue="7d"
        placeholder="Select Time Period"
        onChange={setTimePeriod}
      >
        {timePeriods.map((timePeriod) => (
          <Option
            value={timePeriod}
            key={timePeriod}  
          >
            {timePeriod}
          </Option>
        ))}
      </Select>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title
              className="coin-details-heading"
              level={3}
            >
              {crypto.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {crypto.name}
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col
              className="coin-stats"
              key={title}
            >
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title
              className="coin-details-heading"
              level={3}
            >
              Other Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col
              className="coin-stats"
              key={title}
            >
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title
            className="coin-details-heading"
            level={3}
          >
            What is {crypto.name}
          </Title>
          <Text>
            {HTMLReactParser(crypto.description)}
          </Text>
        </Row>
        <Col className="coin-links">
          <Title
            className="coin-details-heading"
            level={3}
          >
            {crypto.name} Links
          </Title>
          {crypto.links.map((link) => (
            <Row 
              className="coin-link"
              key={link.name}
            >
              <Title
                className="link-name"
                level={5}
              >
                {link.type}
              </Title>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default Crypto;
