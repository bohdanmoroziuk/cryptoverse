import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';

import { Navbar } from 'components';

import Logo from 'assets/images/cryptocurrency.png';

const App = () => (
  <div className="app">
    <nav className="navbar">
      <Navbar icon={Logo} title="Cryptoverse" />
    </nav>
    <main className="main"></main>
    <footer className="footer"></footer>
  </div>
);

export default App;
