import { Api } from '../lib/api.js'

export function hostsHasErrored(bool) {
    return {
        type: 'HOSTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function hostsIsLoading(bool) {
    return {
        type: 'HOSTS_IS_LOADING',
        isLoading: bool
    };
}

export function hostsFetchDataSuccess(hosts) {
    return {
        type: 'HOSTS_FETCH_DATA_SUCCESS',
        hosts
    };
}

export function hostHasErrored(bool) {
    return {
        type: 'HOST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function hostIsLoading(bool) {
    return {
        type: 'HOST_IS_LOADING',
        isLoading: bool
    };
}

export function hostFetchDataSuccess(host) {
    return {
        type: 'HOST_FETCH_DATA_SUCCESS',
        host
    };
}


export function hostFetchData(url) {
    return (dispatch) => {
        dispatch(hostIsLoading(true));

        Api.get(url)
            .then((response) => {
                dispatch(hostIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((host) => dispatch(hostFetchDataSuccess(host)))
            .catch(() => dispatch(hostHasErrored(true)));
            
    };
}

export function hostsFetchData(url) {
    return (dispatch) => {
        dispatch(hostsIsLoading(true));

        Api.get(url)
            .then((response) => {

                dispatch(hostsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((hosts) => dispatch(hostsFetchDataSuccess(hosts)))
            .catch(() => dispatch(hostsHasErrored(true)));
            
    };
}


