export function hostsHasErrored(state = false, action) {
    switch (action.type) {
        case 'HOSTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function hostsIsLoading(state = false, action) {
    switch (action.type) {
        case 'HOSTS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function hosts(state = {}, action) {
    switch (action.type) {
        case 'HOSTS_FETCH_DATA_SUCCESS':
            return action.hosts;

        default:
            return state;
    }
}

export function hostHasErrored(state = false, action) {
    switch (action.type) {
        case 'HOST_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function hostIsLoading(state = false, action) {
    switch (action.type) {
        case 'HOST_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function host(state = {}, action) {
    switch (action.type) {
        case 'HOST_FETCH_DATA_SUCCESS':
            return action.host;

        default:
            return state;
    }
}