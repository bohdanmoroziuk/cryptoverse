import { Card } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';

const CryptocurrencyCard = ({ currency }) => {
  const cryptoPagePath = `/crypto/${currency.id}`;
  const title = `${currency.rank}. ${currency.name}`;
  const extra = (
    <img
      className="crypto-image"
      src={currency.iconUrl}
      alt={currency.name}
    />
  );
  const price = millify(currency.price);
  const marketCap = millify(currency.marketCap);
  const dailyChange = millify(currency.change);

  return (
    <Link
      className="crypto-card"
      to={cryptoPagePath}
    >
      <Card
        title={title}
        extra={extra}
        hoverable
      >
        <p>Price: {price}</p>
        <p>Market Cap: {marketCap}</p>
        <p>Daily Change: {dailyChange}%</p>
      </Card>
    </Link>
  );
};

export default CryptocurrencyCard;
