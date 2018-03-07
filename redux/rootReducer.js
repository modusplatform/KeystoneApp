import { combineReducers } from 'redux';
import markersReducer from './markers/markers_reducer';

const rootReducer = combineReducers({
  markers: markersReducer
});

export default rootReducer;
