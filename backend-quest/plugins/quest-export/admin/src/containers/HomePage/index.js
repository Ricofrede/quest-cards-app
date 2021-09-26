/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {

  return (
    <div>
      <h1>Export Quest-App Data</h1>
      <a href='http://localhost:1337/quest-export' target="_blank" download>Download</a>
    </div>
  );
};

export default memo(HomePage);
