import { Api } from '../lib/api.js'

export function metricsHasErrored(bool) {
    return {
        type: 'METRICS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function metricsIsLoading(bool) {
    return {
        type: 'METRICS_IS_LOADING',
        isLoading: bool
    };
}

export function metricsFetchDataSuccess(metrics) {
    return {
        type: 'METRICS_FETCH_DATA_SUCCESS',
        metrics
    };
}


export function metricsFetchData(url) {
    return (dispatch) => {
        dispatch(metricsIsLoading(true));

        Api.get(url)
            .then((response) => {
                dispatch(metricsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((metrics) => dispatch(metricsFetchDataSuccess(metrics)))
            .catch(() => dispatch(metricsHasErrored(true)));
    };
}