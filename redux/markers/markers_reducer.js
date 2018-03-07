const initialState = {
  markers: [],
  error: ''
};
 
function markersReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_MARKERS':
    return { ...state, markers: action.payload };    
    case 'GET_MARKERS_SUCCESS':
      return { ...state, markers: action.payload };
    case 'GET_MARKERS_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default markersReducer;
