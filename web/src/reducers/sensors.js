export function sensorsHasErrored(state = false, action) {
    switch (action.type) {
        case 'SENSORS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function sensorsIsLoading(state = false, action) {
    switch (action.type) {
        case 'SENSORS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function sensors(state = {}, action) {
    switch (action.type) {
        case 'SENSORS_FETCH_DATA_SUCCESS':
            return action.sensors;

        default:
            return state;
    }
}

