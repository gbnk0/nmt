import { Api } from '../lib/api.js'

export function graphHasErrored(bool) {
    return {
        type: 'GRAPH_HAS_ERRORED',
        hasErrored: bool
    };
}

export function graphIsLoading(bool) {
    return {
        type: 'GRAPH_IS_LOADING',
        isLoading: bool
    };
}

export function graphFetchDataSuccess(graph) {
    return {
        type: 'GRAPH_FETCH_DATA_SUCCESS',
        graph
    };
}


export function graphFetchData(url) {
    return (dispatch) => {
        dispatch(graphIsLoading(true));

        Api.get(url)
            .then((response) => {
                dispatch(graphIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((graph) => dispatch(graphFetchDataSuccess(graph)))
            .catch(() => dispatch(graphHasErrored(true)));
    };
}