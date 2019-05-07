import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import 'normalize.css';
import './assets/less/index.less';

import PageHeader from './components/page-header/page-header';
import PageFooter from './components/page-footer/page-footer';
import Home from './views/home/home';

function App() {
  return (
    <div className="page-wrap">
      <div className="page">
        <div className="header">
          <PageHeader/>
        </div>
        <div className="page-content">
          <BrowserRouter>
            <Route path="/" component={Home}/>
          </BrowserRouter>
        </div>
      </div>
      <div className="footer">
        <PageFooter/>
      </div>
    </div>
  );
}

export default hot(App);