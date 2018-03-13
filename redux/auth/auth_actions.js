import firebase from 'firebase';

const AUTH_USER_GOOGLE = 'auth_user_google';
const AUTH_USER_ANON = 'auth_user_anon';
const AUTH_ERROR = 'auth_error';
const UNAUTH_USER = 'unauth_user';

export function signUpGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();


}

export function signInGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
}

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