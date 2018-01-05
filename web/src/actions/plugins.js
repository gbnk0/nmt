import { Api } from '../lib/api.js'

export function pluginsHasErrored(bool) {
    return {
        type: 'PLUGINS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function pluginsIsLoading(bool) {
    return {
        type: 'PLUGINS_IS_LOADING',
        isLoading: bool
    };
}

export function pluginsFetchDataSuccess(plugins) {
    return {
        type: 'PLUGINS_FETCH_DATA_SUCCESS',
        plugins
    };
}


export function pluginsFetchData(url) {
    return (dispatch) => {
        
        dispatch(pluginsIsLoading(true));

        Api.get(url)
            .then((response) => {
                dispatch(pluginsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((plugins) => dispatch(pluginsFetchDataSuccess(plugins)))
            .catch(() => dispatch(pluginsHasErrored(true)));
    };
}