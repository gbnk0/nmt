
export function getApiUrl() {
  const ApiUrl = localStorage.getItem('ApiUrl');
  
  if (ApiUrl !== null) {
    return ApiUrl
  } else {
    return 'localhost:8080'
  }
  
}
export var ApiUrl = 'http://' + getApiUrl()

export const forbiddenStatuses = [401, 403, 500]


export class sessionApi {

  static login(credentials) {
    const request = new Request(ApiUrl + '/auth', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json, text/plain'
      }),
      body: JSON.stringify(credentials)

    });

    return fetch(request).then(response => {
      if (response.status == 401) {
        return {'status': 'failed'}
      }
      return response.json();
    }).catch(error => {
      return error;
    });
  }


  static verifyToken() {
    const request = new Request(ApiUrl + '/auth/verify', {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.jwt}`
      })
    });

    return fetch(request).then(response => {
      if (response.status == 400) {
        localStorage.removeItem('jwt');
      }
      return response.json();

    }).catch(error => {
      localStorage.removeItem('jwt');
      return error;
    });
  }

}


export class Api {


  static get(path) {
    const request = new Request(ApiUrl + path, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.jwt}`
      })
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        
        if (forbiddenStatuses.includes(response.status)) {
          
          sessionApi.verifyToken()
        }
        throw Error(response.statusText);
      }
      return response;
    }).catch(error => {
      return error;
    });
  }

  static post(path, payload) {
    const request = new Request(ApiUrl + path, {
      method: 'POST',
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.jwt}`
      }),
      body: JSON.stringify(payload)
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        if (forbiddenStatuses.includes(response.status)) {
            sessionApi.verifyToken()
          }
          throw Error(response.statusText);
      }
      return response;
    }).catch(error => {
      return error;
    });
  }

  static delete(path, payload) {
    const request = new Request(ApiUrl + path, {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.jwt}`
      }),
      body: JSON.stringify(payload)
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        if (response.status in forbiddenStatuses) {
          sessionApi.verifyToken()
        }
        throw Error(response.statusText);
      }
      return response;
    }).catch(error => {
      return error;
    });
  }

}

