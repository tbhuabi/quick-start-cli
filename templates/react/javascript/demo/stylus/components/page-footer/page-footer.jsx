import React from 'react';
import cssModules from 'react-css-modules';
import styles from './page-footer.styl';

function pageFooter() {
  return (
    <div styleName="footer-wrap">
      <div className="container">
        QQ：464328895
      </div>
    </div>
  );
}

export default cssModules(pageFooter, styles);
