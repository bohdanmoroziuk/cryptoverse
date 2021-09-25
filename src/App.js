import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';

import { Home, News, Exchanges, Cryptocurrencies, Crypto } from 'pages';

import { Navbar } from 'components';

import Logo from 'assets/images/cryptocurrency.png';

const App = () => (
  <div className="app">
    <nav className="navbar">
      <Navbar icon={Logo} title="Cryptoverse" />
    </nav>
    <main className="main">
      <Layout>
        <div className="routes">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/exchanges">
              <Exchanges />
            </Route>
            <Route path="/crypto/:coinId">
              <Crypto />
            </Route>
            <Route path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
          </Switch>
        </div>
      </Layout>
      <footer className="footer">
        <Typography.Title
          level={5}
          style={{ color: 'white', textAlign: 'center' }}  
        >
          Cryptoverse
        </Typography.Title>
        <Typography.Text style={{ color: 'white', textAlign: 'center' }}>
          All rights reserved
        </Typography.Text>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
      </footer>
    </main>
  </div>
);

export default App;
