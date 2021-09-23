import { Row, Col } from 'antd';

import { CryptocurrencyCard } from 'components';

const CryptocurrenciesList = ({ cryptos }) => (
  <>
    <Row
      className="crypto-card-container"
      gutter={[32, 32]}
    >
      {cryptos.map((currency) => (
        <Col
          key={currency.id}
          xs={24}
          sm={12}
          lg={6}
        >
          <CryptocurrencyCard
            currency={currency}
          />
        </Col>
      ))}
    </Row>
  </>
);

export default CryptocurrenciesList;
