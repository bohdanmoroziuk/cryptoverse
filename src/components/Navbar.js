import { useState, useEffect } from 'react';

import { Menu, Button, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import { getScreenSize, toggle } from 'utils/common';
import { breakpoints } from 'config/constants';

const menuItems = [
  {
    path: '/',
    label: 'Home',
    icon: <HomeOutlined />
  },
  {
    path: '/cryptocurrencies',
    label: 'Cryptocurrencies',
    icon: <FundOutlined />
  },
  {
    path: '/exchanges',
    label: 'Exchanges',
    icon: <MoneyCollectOutlined />
  },
  {
    path: '/news',
    label: 'News',
    icon: <BulbOutlined />
  },
];

const Navbar = ({ title, icon }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  
  const [screenSize, setScreenSize] = useState(getScreenSize);

  const hideMenu = () => {
    setIsMenuActive(false);
  };

  const toggleMenu = () => {
    setIsMenuActive(toggle);
  };

  const handleMenuItemClick = () => {
    if (screenSize < breakpoints.md) {
      hideMenu();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMenuActive(screenSize >= breakpoints.md);
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title className="logo" level={2}>
          <Link to="/">{title}</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={toggleMenu}
        >
          <MenuOutlined />
        </Button>
      </div>
      {isMenuActive && (
        <Menu theme="dark">
          {menuItems.map((menuItem) => (
            <Menu.Item
              icon={menuItem.icon}
              key={menuItem.label}
              onClick={handleMenuItemClick}
            >
              <Link to={menuItem.path}>
                {menuItem.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
