import { Api } from '../lib/api.js'

export function sensorsHasErrored(bool) {
    return {
        type: 'SENSORS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function sensorsIsLoading(bool) {
    return {
        type: 'SENSORS_IS_LOADING',
        isLoading: bool
    };
}

export function sensorsFetchDataSuccess(sensors) {
    return {
        type: 'SENSORS_FETCH_DATA_SUCCESS',
        sensors
    };
}


export function sensorsFetchData(url) {
    return (dispatch) => {
        
        dispatch(sensorsIsLoading(true));

        Api.get(url)
            .then((response) => {
                dispatch(sensorsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((sensors) => dispatch(sensorsFetchDataSuccess(sensors)))
            .catch(() => dispatch(sensorsHasErrored(true)));
    };
}