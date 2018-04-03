import firebase from 'firebase';

const AUTH_USER = 'auth_user_google';
const AUTH_ERROR = 'auth_error';
const UNAUTH_USER = 'unauth_user';


export function signInAnon() {
  return function(dispatch) {
    firebase.auth().signInAnonymously()
    .then((user) => {
      dispatch({ type: AUTH_USER, payload: user });
    }).catch(error => dispatch(authError(error.message)));
  }
}

export function signOut() {
  return function(dispatch) {
    firebase.auth().signOut()
    .then(() => dispatch({ type: UNAUTH_USER }))
    .catch(err => dispatch(authError(error.message)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}