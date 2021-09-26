import { useState, useEffect } from 'react';

import { Input } from 'antd';

import { useGetCryptosQuery } from 'services/crypto';

import { CryptocurrenciesList, Loader } from 'components';

const Cryptocurrencies = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [cryptos, setCryptos] = useState([]);

  const { data, isFetching } = useGetCryptosQuery({ count: 100 });

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const coins = data?.coins?.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    }) ?? [];

    setCryptos(coins);
  }, [data, searchTerm]);

  return (
    <div className="page">
      <div className="search-crypto">
        <Input
          placeholder="Seach Cryptocurrencies"
          onChange={handleSearchTermChange}
          value={searchTerm}
        />
      </div>
      {isFetching ? (
        <Loader />
      ) : (
        <CryptocurrenciesList cryptos={cryptos} />
      )}
    </div>
  );
};

export default Cryptocurrencies;
