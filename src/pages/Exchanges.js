import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { Table } from 'antd';

import { Loader } from 'components';

import { useGetExchangesQuery } from 'services/crypto';

const Exchanges = () => {
  const { data: exchanges, isFetching } = useGetExchangesQuery();

  if (isFetching) {
    return <Loader />
  }

  const columns = [
    { title: 'Exchanges', dataIndex: 'exchanges', key: 'exchanges' },
    { title: '24h Trade Volume', dataIndex: 'volume', key: 'volume' },
    { title: 'Markets', dataIndex: 'markets', key: 'markets' },
    { title: 'Change', dataIndex: 'change', key: 'change' },
  ];

  const rows = exchanges.map((exchange) => ({
    key: exchange.id,
    exchanges: exchange.name,
    volume: `$${millify(exchange.volume)}`,
    markets: millify(exchange.numberOfMarkets),
    change: `${millify(exchange.marketShare)}%`,
    description: exchange.description,
  }));

  return (
    <div className="page">
      <Table
        columns={columns}
        dataSource={rows}
        expandable={{
          expandedRowRender: record => HTMLReactParser(record.description),
          rowExpandable: record => !!record.description,
        }}
      />
    </div>
  );
};

export default Exchanges;
