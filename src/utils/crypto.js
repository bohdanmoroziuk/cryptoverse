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

export const createStats = (crypto) => ({
  stats: [
    { title: 'Price to USD', value: `$ ${crypto.price && millify(crypto.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: crypto.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${crypto.volume && millify(crypto.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${crypto.marketCap && millify(crypto.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(crypto.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ],
  genericStats: [
    { title: 'Number Of Markets', value: crypto.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: crypto.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: crypto.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(crypto.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(crypto.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ],
});

export const getChartData = (history) => {
  const timestamps = history
    .map((item) => item.timestamp)
    .map((timestamp) => new Date(timestamp).toLocaleDateString())

  const prices = history
    .map((item) => item.price);

  return {
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
};
