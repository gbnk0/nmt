export function metricsHasErrored(state = false, action) {
    switch (action.type) {
        case 'METRICS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function metricsIsLoading(state = false, action) {
    switch (action.type) {
        case 'METRICS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function metrics(state = {}, action) {
    switch (action.type) {
        case 'METRICS_FETCH_DATA_SUCCESS':
            return action.metrics;

        default:
            return state;
    }
}

