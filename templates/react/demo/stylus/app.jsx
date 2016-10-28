import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import 'normalize.css';
import './assets/scss/index.scss';

import PageHeader from './components/page-header/page-header';
import PageFooter from './components/page-footer/page-footer';
import Home from './views/home/home';

function App() {
  return (
    <div className="page-wrap">
      <div className="page">
        <div className="header">
          <PageHeader />
        </div>
        <div className="page-content">
          <Router history={browserHistory}>
            <Route path="/" component={Home} />
          </Router>
        </div>
      </div>
      <div className="footer">
        <PageFooter />
      </div>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById('app'));
