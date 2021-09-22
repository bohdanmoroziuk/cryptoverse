import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';

import { Home, News, Exchanges, Cryptocurrencies } from 'pages';

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
            <Route path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
          </Switch>
        </div>
      </Layout>
    </main>
    <footer className="footer"></footer>
  </div>
);

export default App;
