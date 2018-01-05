import { Api } from '../lib/api.js'
import Notifications, { success, error, info } from 'react-notification-system-redux';

function deleteNetworkNotification(netCount) {
    const SuccessDeleteNotification = {
        title: 'Network deletion',
        message: 'Successfuly deleted ' + netCount + ' network(s)',
        position: 'tr',
        autoDismiss: 2
    };

    return SuccessDeleteNotification
}

export function networksHasErrored(bool) {
    return {
        type: 'NETWORKS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function networksIsLoading(bool) {
    return {
        type: 'NETWORKS_IS_LOADING',
        isLoading: bool
    };
}

export function networksFetchDataSuccess(networks) {
    return {
        type: 'NETWORKS_FETCH_DATA_SUCCESS',
        networks
    };
}

export function networksFetchData(url) {

    return (dispatch) => {

        dispatch(networksIsLoading(true));
   

        Api.get(url)
            .then((response) => {
                dispatch(networksIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((networks) => dispatch(networksFetchDataSuccess(networks)))
            .catch(() => dispatch(networksHasErrored(true)));
    };
}

// POST DATA //

export function networksPostIsLoading(bool) {
    return {
        type: 'NETWORKS_POST_IS_LOADING',
        isLoading: bool
    };
}


export function networksPostHasErrored(bool) {
    return {
        type: 'NETWORKS_POST_HAS_ERRORED',
        hasErrored: bool
    };
}


export function networksPostDataSuccess(bool) {
    return {
        type: 'NETWORKS_POST_DATA_SUCCESS',
        isSuccess: bool
    };
}



export function networksPostData(url, networks) {

    return (dispatch) => {

        dispatch(networksPostIsLoading(true));

        Api.post(url, networks)
            .then((response) => {
                dispatch(networksPostIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then(dispatch(networksPostDataSuccess(true)))
            .catch(() => dispatch(networksPostHasErrored(true)));
    };
}


// DELETE DATA //

export function networksDeleteIsLoading(bool) {
    return {
        type: 'NETWORKS_DELETE_IS_LOADING',
        isLoading: bool
    };
}


export function networksDeleteHasErrored(bool) {
    return {
        type: 'NETWORKS_DELETE_HAS_ERRORED',
        hasErrored: bool
    };
}


export function networksDeleteDataSuccess(bool) {
    
    return {
        type: 'NETWORKS_DELETE_DATA_SUCCESS',
        isSuccess: bool
    };
}



export function networksDeleteData(url, networkList) {

    return (dispatch) => {

        dispatch(networksDeleteIsLoading(true));

        Api.delete(url, networkList)
            .then((response) => {
                dispatch(networksDeleteIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then(
                dispatch(networksDeleteDataSuccess(true)),
            dispatch(info(deleteNetworkNotification(networkList.length)))
            )
            .catch(() => dispatch(networksDeleteHasErrored(true)));
    };
}
