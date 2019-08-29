import 'babel-polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { store, history } from './configureStore';
import App from './containers/App.cont';
import Search from './containers/Search.cont';

import '../styles/bundle.less';

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Search} />
                <Route path='search' component={Search} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
