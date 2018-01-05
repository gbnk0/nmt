import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware} from 'react-router-redux'

export const history = createHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware =  (
        composeEnhancers(
            applyMiddleware(thunk),
            applyMiddleware(routerMiddleware(history))
        )
    );


export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        middleware
    );
}