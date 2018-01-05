export function graphHasErrored(state = false, action) {
    switch (action.type) {
        case 'GRAPH_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function graphIsLoading(state = false, action) {
    switch (action.type) {
        case 'GRAPH_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function graph(state = {}, action) {
    switch (action.type) {
        case 'GRAPH_FETCH_DATA_SUCCESS':
            return action.graph;

        default:
            return state;
    }
}

