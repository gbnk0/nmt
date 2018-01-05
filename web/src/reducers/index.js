
import { combineReducers } from 'redux';

import { networks, networksHasErrored, networksIsLoading } from './networks';
import { networksPostDataSuccess, networksPostIsLoading, networksPostHasErrored } from './networks';
import { addNetworkToList } from './networks'
import { hosts, hostsHasErrored, hostsIsLoading, host, hostHasErrored, hostIsLoading } from './hosts';
import { metrics, metricsHasErrored, metricsIsLoading } from './metrics';
import { graph, graphHasErrored, graphIsLoading } from './graph';
import { sensors, sensorsHasErrored, sensorsIsLoading } from './sensors';
import { plugins, pluginsHasErrored, pluginsIsLoading } from './plugins';
import { users, usersHasErrored, usersIsLoading } from './users';
import { search, searchHasErrored, searchIsLoading, searchterm } from './search';

import { sessionReducer, loginLoading, loginFailed, userHasErrored, userIsLoading, user } from './sessions';

import { routerReducer } from 'react-router-redux'
import { reducer as notifications } from 'react-notification-system-redux';

export default combineReducers({
    networks,
    networksHasErrored,
    networksIsLoading,
    networksPostDataSuccess,
    networksPostIsLoading,
    networksPostHasErrored,
    addNetworkToList,
    hosts,
    hostsHasErrored,
    hostsIsLoading,
    host,
    hostHasErrored,
    hostIsLoading,
    metrics,
    metricsHasErrored,
    metricsIsLoading,
    graph,
    graphHasErrored,
    graphIsLoading,
    sensors,
    sensorsHasErrored,
    sensorsIsLoading,
    plugins,
    pluginsHasErrored,
    pluginsIsLoading,
    users,
    usersHasErrored,
    usersIsLoading,
    search,
    searchHasErrored,
    searchIsLoading,
    searchterm,
    sessionReducer,
    loginLoading,
    loginFailed,
    userHasErrored,
    userIsLoading,
    user,
    router: routerReducer,
    notifications
});