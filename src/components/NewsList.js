import { Row, Col } from 'antd';

import { NewsCard } from 'components';

const NewsList = ({ news }) => (
  <Row gutter={[24, 24]}>
    {news.map((news) => (
      <Col
        key={news.url}
        xs={24}
        sm={12}
        lg={8}
      >
        <NewsCard news={news} />
      </Col>
    ))}
  </Row>
);

export default NewsList;
