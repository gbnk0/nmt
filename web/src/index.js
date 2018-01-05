import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import MainContainer from './containers/MainContainer';

import { Provider } from 'react-redux';
import { configureStore, history } from './stores/configureStore';
import { ConnectedRouter} from 'react-router-redux'



export const initialState = {
    networks: {
        results: [],
        checked:[]
    },
    hosts: {
        results: [],
        network: {}
    },
    host: {
        host: {
            network: {},
            services: []
        }
    },
    metrics: {},
    users: {
        results: []
    },
    graph: {
        nodes: [],
        edges: []
    },
    sensors: {
        results: []
    },
    plugins: {
        results: []
    },
    search: {
        results: []
    },
    searchterm: '',
    sessionReducer: !!localStorage.jwt,
    user: {
        me: {}
    }

};
const store = configureStore(initialState, history);


ReactDOM.render((
<Provider store={store}>
    <ConnectedRouter history={history}>
        <MainContainer />
    </ConnectedRouter>
</Provider>
    ), document.getElementById('app'));