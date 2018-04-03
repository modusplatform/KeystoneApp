const initialState = {
    authUser: null,
    error: ''
  };
   
  function authReducer(state = initialState, action) {
    switch(action.type) {
      case 'AUTH_USER':
      return { ...state, authUser: action.payload.authUser };
      case 'AUTH_ERROR':
        return { ...state, error: action.payload };
      case 'UNAUTH_USER':
        return { ...state, authUser: null };
      default:
        return state;
    }
  }
  
  export default authReducer;
  