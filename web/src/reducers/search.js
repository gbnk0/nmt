
export function searchHasErrored(state = false, action) {
    switch (action.type) {
        case 'SEARCH_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function searchIsLoading(state = false, action) {
    switch (action.type) {
        case 'SEARCH_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function search(state = {}, action) {
    switch (action.type) {
        case 'SEARCH_FETCH_DATA_SUCCESS':
            return action.search;

        default:
            return state;
    }
}


export function searchterm(state = '', action) {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return action.searchterm;

        default:
            return state;
    }
}
