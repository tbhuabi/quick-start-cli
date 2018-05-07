import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import './assets/less/index.less';

import PageHeader from './components/page-header/page-header';
import PageFooter from './components/page-footer/page-footer';
import Home from './views/home/home';

class App extends Component {
    render() {
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
}

render(<App/>, document.getElementById('app'));
