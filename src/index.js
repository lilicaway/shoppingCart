import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Root from './components/Root';
import configureStore from './redux/configureStore';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
