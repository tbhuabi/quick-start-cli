import React from 'react';
import cssModules from 'react-css-modules';
import styles from './page-header.scss';

function pageHeader() {
  return (
    <div styleName="header-wrap">
      <header className="container">
        <div className="pull-left" styleName="brand">Quick start</div>
        <div className="pull-right" styleName="link">
          <a href="https://github.com/18616392776/quick-start-cli">Github</a>
        </div>
      </header>
    </div>
  );
}

export default cssModules(pageHeader, styles);
