import { Api } from '../lib/api.js'

export function searchHasErrored(bool) {
    return {
        type: 'SEARCH_HAS_ERRORED',
        hasErrored: bool
    };
}

export function searchIsLoading(bool) {
    return {
        type: 'SEARCH_IS_LOADING',
        isLoading: bool
    };
}

export function searchFetchDataSuccess(search) {
    return {
        type: 'SEARCH_FETCH_DATA_SUCCESS',
        search
    };
}


export function setSearchTerm(searchterm) {
    return {
        type: 'SET_SEARCH_TERM',
        searchterm
    };
}

export function searchFetchData(url) {
    return (dispatch) => {
        dispatch(searchIsLoading(true));

        Api.get(url)
            .then((response) => {
                dispatch(searchIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((search) => dispatch(searchFetchDataSuccess(search)))
            .catch(() => dispatch(searchHasErrored(true)));
    };
}


