import { useState } from 'react';

import { Row, Col, Card, Input } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';

import { useGetCryptosQuery } from 'services/crypto';
import { useEffect } from 'react';

const Cryptocurrencies = ({ simplified }) => {
  const { data, isFetching } = useGetCryptosQuery(simplified ? 10 : 100);

  const [cryptos, setCryptos] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const coins = data?.data?.coins?.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    }) ?? [];

    setCryptos(coins)
  }, [data, searchTerm]);

  if (isFetching) {
    return 'Loading...';
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Seach Cryptocurrencies"
            onChange={handleSearchTermChange}
            value={searchTerm}
          />
        </div>
      )}
      <Row
        className="crypto-card-container"
        gutter={[32, 32]}
      >
        {cryptos?.map((currency) => (
          <Col
            className="crypto-card"
            key={currency.id}
            xs={24}
            sm={12}
            lg={6}
          >
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt="" />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
