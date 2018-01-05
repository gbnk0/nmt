export function networksHasErrored(state = false, action) {
    switch (action.type) {
        case 'NETWORKS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function networksIsLoading(state = false, action) {
    switch (action.type) {
        case 'NETWORKS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function networks(state = {}, action) {
    switch (action.type) {
        case 'NETWORKS_FETCH_DATA_SUCCESS':
            return action.networks;

        default:
            return state;
    }
}




// POST DATA //


export function networksPostHasErrored(state = false, action) {
    switch (action.type) {
        case 'NETWORKS_POST_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function networksPostIsLoading(state = false, action) {
    switch (action.type) {
        case 'NETWORKS_POST_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function networksPostDataSuccess(state = false, action) {
    switch (action.type) {
        case 'NETWORKS_POST_DATA_SUCCESS':
            return action.isSuccess;

        default:
            return state;
    }
}


// CHECK NETWORKS CHECKBOX //

export function addNetworkToList(state = [], action) {
    switch (action.type) {
        case 'ADD_NETWORK_TO_LIST':
            return action.networkId;

        default:
            return state;
    }
}