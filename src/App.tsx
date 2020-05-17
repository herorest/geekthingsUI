import React from 'react';
// import logo from './logo.svg';
import Button from './components/button/button'
import Alert from './components/alert/alert'
import Menu from './components/menu/menu'
import MenuItem from './components/menu/menuItem'
import SubMenu from './components/menu/submenu'
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCoffee, faChevronDown} from '@fortawesome/free-solid-svg-icons';

import './styles/index.scss'
import Icon from './components/icon/icon';
library.add(faCoffee, faChevronDown);

interface BaseButtonProps {
  danger ?: boolean;
  type ?: string;
}

const Child: React.FC<BaseButtonProps> = function (props) {
  return (
    <Button size="small" type="link"
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </Button>
  );
}


const App: React.FC = function () {
  return (
    <div className="App">
      <header className="App-header">
        <h1>123</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Child danger type="dashed" />
        <Button onClick={() => {alert(1)}} disabled size="large">menu1</Button>
        <Button danger size="large">click</Button>
        <Button onClick={() => {alert(2)}} size="small" type="primary">click</Button>
        <Button size="small" type="link">click</Button>
        <Alert type="default" title="你好" content="有天"></Alert>

        <Menu way="vertical" defaultIndex='4' onSelect={(index) => {
          console.log(index);
        }}>
          <MenuItem>menuitem1</MenuItem>
          <MenuItem disabled>menuitem2</MenuItem>
          <MenuItem>menuitem3</MenuItem>
          <MenuItem>menuitem4</MenuItem>
          <SubMenu title="test">
            <MenuItem>menuitem1</MenuItem>
            <MenuItem disabled>menuitem2</MenuItem>
            <MenuItem>menuitem3</MenuItem>
          </SubMenu>
        </Menu>

        {/* <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon> */}

        <Icon icon={'coffee'} theme="danger"></Icon>
      </header>
    </div>
  );
}

export default App;
