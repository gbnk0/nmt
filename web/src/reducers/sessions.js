
export function loginFailed(state = false, action) {
    switch (action.type) {
        case 'LOG_IN_FAILED':
            return action.isFailed;

        default:
            return state;
    }
}

export function loginLoading(state = false, action) {
    switch (action.type) {
        case 'LOG_IN_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}


export function sessionReducer(state = '', action) {
  switch(action.type) {
    
    case 'LOG_IN_SUCCESS':
      return !!localStorage.jwt
    
    case 'LOG_OUT':
          return !!localStorage.jwt

    default:
      return state;
  }
}



export function userHasErrored(state = false, action) {
    switch (action.type) {
        case 'USER_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function userIsLoading(state = false, action) {
    switch (action.type) {
        case 'USER_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function user(state = {}, action) {
    switch (action.type) {
        case 'USER_FETCH_DATA_SUCCESS':
            return action.user;

        default:
            return state;
    }
}

