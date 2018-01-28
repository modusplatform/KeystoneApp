import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'firebase';
import firestore from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = height/width;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialPosition: {
        latitude: 39.952383,
        longitude: -75.1657883,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      error: ''
    }
  }

  watchID: ?number = null

  renderMarkers() {
    return this.state.markers.map((marker, i) => {
      if (marker.latitude && marker.longitude) {
        return ( <Marker
          key={i}
          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
          title={marker.name}
          description={marker.markertext}
          />
        );
      }
    });
  }

  componentWillMount() {
    firebase.firestore().collection('markers').get()
    .then(querySnapshot => {
      let markers = [];
      querySnapshot.forEach(marker => {
        markers.push(marker.data());
      })
      this.setState({ markers });
    })
    .catch((error) => {
      console.log(error);
      this.setState({error});
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const initialRegion = JSON.stringify(position);

      this.setState({initialPosition: initialRegion})
    }, (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastRegion = JSON.stringify(position);

      this.setState({initialPosition: lastRegion})
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.initialPosition}
        >
          {this.renderMarkers()}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  }
});