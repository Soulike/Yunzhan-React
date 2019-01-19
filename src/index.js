import 'react-app-polyfill/ie11';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Store from './Store';
import Router from './Router';
import './index.scss';

ReactDOM.render(
    <Provider store={Store}>
        <Router/>
    </Provider>,
    document.getElementById('root')
);
