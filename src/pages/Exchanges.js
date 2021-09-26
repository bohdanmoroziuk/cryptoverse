import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { Typography, Row, Col, Avatar, Collapse } from 'antd';

import { Loader } from 'components';

import { useGetExchangesQuery } from 'services/crypto';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchanges, isFetching } = useGetExchangesQuery();

  if (isFetching) {
    return <Loader />
  }

  return (
    <div className="page">
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchanges.map((exchange) => (
          <Col
            span={24}
            key={exchange.id}  
          >
            <Collapse>
              <Panel
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Exchanges;
