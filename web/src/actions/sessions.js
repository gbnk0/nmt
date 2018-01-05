
import { sessionApi, Api } from '../lib/api';
import Notifications, { success, error, info } from 'react-notification-system-redux';

const loginSuccessNotification = {
  title: 'Log-in success',
  message: 'Welcome',
  position: 'tr',
  autoDismiss: 2,
};

const loginFailedNotification = {
  title: 'Log-in failed',
  message: 'Incorrect username/password',
  position: 'tr',
  autoDismiss: 2,
};

const logOutNotification = {
  title: 'You logged out',
  message: 'See you later !',
  position: 'tr',
  autoDismiss: 2,
};

export function loginSuccess(bool, history) {
  history.push('/home/');
  return {type: 'LOG_IN_SUCCESS'}
}

export function loginFailed(bool) {
  return {
    type: 'LOG_IN_FAILED',
    isFailed: bool
  }
}

export function loginLoading(bool) {
  return {
    type: 'LOG_IN_LOADING',
    isLoading: bool
  }
}

export function logOutUser(history) {
  localStorage.removeItem('jwt');
  history.push('/login/');
  return {
    type: 'LOG_OUT'
  }
}


export function logInUser(credentials, history) {
  return function(dispatch) {

    dispatch(loginLoading(true));

    return sessionApi.login(credentials).then(response => {
      console.log(response);
      if ('access_token' in response) {

        localStorage.setItem('jwt', response.access_token);
        dispatch(loginSuccess(true, history));
        dispatch(loginLoading(false));
        dispatch(userFetchData('/auth/me'));
        dispatch(success(loginSuccessNotification));

      } else {
        
        dispatch(loginLoading(false));
        dispatch(error(loginFailedNotification));
        dispatch(loginFailed(true));
      }
      dispatch(loginLoading(false));

    }).catch(error => {
      dispatch(loginLoading(false));
      throw(error);
    });
  };
}


// token management

export function verifyingToken() {
  return {
    type: 'VERIFYING_TOKEN'
  }
}

export function invalidToken() {
  return {
    type: 'INVALID_TOKEN'
  }
}


export function verifyToken() {
  return function(dispatch) {

    dispatch(verifyingToken());
    
    return sessionApi.verifyToken().then(response => {

      if (response.valid == false) {

        localStorage.removeItem('jwt');

      }

    }).catch(error => {
      
      throw(error);
    });
  };
}



// user data retrieving


export function userHasErrored(bool) {
    return {
        type: 'USER_HAS_ERRORED',
        hasErrored: bool
    };
}

export function userIsLoading(bool) {
    return {
        type: 'USER_IS_LOADING',
        isLoading: bool
    };
}

export function userFetchDataSuccess(user) {
    return {
        type: 'USER_FETCH_DATA_SUCCESS',
        user
    };
}


export function userFetchData(url) {
    return (dispatch) => {
        dispatch(userIsLoading(true));

        Api.get(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(userIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((user) => dispatch(userFetchDataSuccess(user)))
            .catch(() => dispatch(userHasErrored(true)));
    };
}