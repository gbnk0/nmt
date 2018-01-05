export function pluginsHasErrored(state = false, action) {
    switch (action.type) {
        case 'PLUGINS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function pluginsIsLoading(state = false, action) {
    switch (action.type) {
        case 'PLUGINS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function plugins(state = {}, action) {
    switch (action.type) {
        case 'PLUGINS_FETCH_DATA_SUCCESS':
            return action.plugins;

        default:
            return state;
    }
}

