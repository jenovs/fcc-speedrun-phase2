import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import TributePage from './components/TributePage/App';
import TributePageAbout from './components/TributePage/About';

import NotFound404 from './components/NotFound404';

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='tribute-page' component={TributePage} />
    <Route path='tribute-page/about' component={TributePageAbout} />

    <Route path='*' component={NotFound404} />
  </Route>
);
