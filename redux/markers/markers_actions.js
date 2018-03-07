const GET_MARKERS = 'get_markers';
const GET_MARKERS_ERR = 'get_markers_err';

import firebase from 'firebase';
import firestore from 'firebase/firestore';

export function getMarkers() {
  return function(dispatch) {
    firebase.firestore().collection('markers').get()
    .then(querySnapshot => {
      let markers = [];
      querySnapshot.forEach(marker => {
        markers.push(marker.data());
      });
      return dispatch({ type: GET_MARKERS, payload: markers });
    })
    .catch((error) => {
      return dispatch({ type: GET_MARKERS_ERR, payload: error });
    });
  };
}
