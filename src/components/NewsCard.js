import { Typography, Avatar, Card } from 'antd';
import moment from 'moment';

const { Text, Title } = Typography;

const demoImageUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const NewsCard = ({ news }) => {
  const { url, name, } = news;

  const icon = news?.image?.thumbnail?.contentUrl ?? demoImageUrl;

  const description = news.description.length > 100
    ? news.description.slice(0, 100).concat('...')
    : news.description;

  const providerAvatar = news.provider[0]?.image?.thumbnail?.contentUrl ?? demoImageUrl;

  const providerName = news.provider[0]?.name;

  const publishedAt = moment(news.datePublished).startOf('ss').fromNow();

  return (
    <Card
      className="news-card"
      hoverable
    >
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
      > 
        <div className="news-image-container">
          <Title
            className="news-title"
            level={4}
          >
            {name}
          </Title>
          <img
            src={icon}
            alt={name}
            style={{ maxWidth: '200px', maxHeight: '100px' }}
          />
        </div>
        <p>
          {description}
        </p>
        <div className="provider-container">
          <div>
            <Avatar
              src={providerAvatar}
              alt=""
            />
            <Text className="provider-name">{providerName}</Text>
          </div>
          <Text>{publishedAt}</Text>
        </div>
      </a>
    </Card>
  );
};

export default NewsCard;
