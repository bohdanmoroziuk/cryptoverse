import { useState } from 'react';

import { Row, Col, Select, Divider } from 'antd';

import { useGetCryptoNewsQuery } from 'services/crypto-news';
import { useGetCryptosQuery } from 'services/crypto';

import { NewsList, Loader } from 'components';

const { Option } = Select;

const News = () => {
  const [category, setCategory] = useState('Cryptocurrency');

  const { data: cryptoNews, isFetching: isFetching1 } = useGetCryptoNewsQuery({
    category,
    count: 18,
  });

  const { data: cryptos, isFetching: isFetching2 } = useGetCryptosQuery({
    count: 100,
  });

  const news = cryptoNews?.value ?? [];

  const currencies = cryptos?.data?.coins ?? [];

  return (
    <div className="page">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Select
            className="search-news"
            showSearch
            placeholder="Select a Crypto"
            optionFilterProp="children"
            filterOption={(input, option) => {
              return option.children.toLowerCase().includes(input.toLowerCase());
            }}
            onChange={setCategory}
          >
            <Option value="Cryptocurrency">
              Cryptocurrency
            </Option>
            {currencies.map((currency) => (
              <Option
                value={currency.name}
                key={currency.name}  
              >
                {currency.name}   
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Divider orientation="left" />
      {isFetching1 ? (
        <Loader />
      ) : (
        <NewsList news={news} />
      )}
    </div>
  );
};

export default News;
