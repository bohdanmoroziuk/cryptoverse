import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { Row, Col, Typography, Select } from 'antd';
import HTMLReactParser from "html-react-parser";
import millify from "millify";

import { LineChart, Loader } from 'components';

import { useGetCryptoQuery, useGetCryptoHistoryQuery } from 'services/crypto';

import { createStats } from 'utils/crypto';
import { timePeriods, defaultTimePeriod } from 'config/constants';

const { Title, Text } = Typography;
const { Option } = Select;

const Crypto = () => {
  const [timePeriod, setTimePeriod] = useState(defaultTimePeriod);
  
  const { coinId } = useParams();

  const { data: crypto, isFetching: isFetching1 } = useGetCryptoQuery({ id: coinId });

  const { data: coinHistory, isFetching: isFetching2 } = useGetCryptoHistoryQuery({ id: coinId, timePeriod, })


  if (isFetching1) {
    return <Loader />;
  }

  const { stats, genericStats } = createStats(crypto);

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

      {isFetching2 ? (
        <Loader />
      ) : (
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(crypto.price)}
          coinName={crypto.name}
        />
      )}

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
