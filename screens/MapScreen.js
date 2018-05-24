import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import firebase from 'firebase';
import firestore from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = height/width;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const PHILA_LAT = 39.952383;
const PHILA_LONG = -75.1657883;

export default class MapScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialPosition: {
        latitude: PHILA_LAT,
        longitude: PHILA_LONG,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      error: ''
    }

    this.watchID = null;
  }


  renderMarkers() {
    return this.state.markers.map((marker, i) => {
      if (marker.latitude && marker.longitude) {
        return ( <MapView.Marker
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
    const firestore = firebase.firestore();
    const settings = {
      timestampsInSnapshots: true,
    };
    firestore.settings(settings);

    firestore.collection('markers').get()
    .then(querySnapshot => {
      let markers = [];
      querySnapshot.forEach(marker => {
        markers.push(marker.data());
      });

      this.setState({ markers });
    })
    .catch((error) => {
      console.log(error);
      this.setState({error});
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const initialRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      this.setState({initialPosition: initialRegion})
    }, (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      this.setState({initialPosition: lastRegion})
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <MapView
        style={styles.map}
        region={this.state.initialPosition}
      >
        <Icon
          reverse
          name='camera'
          style={styles.cameraIcon}
          color={Colors.primaryBlue}
          onPress={() => this.props.navigation.navigate('ARScreen')}
        />
        {this.renderMarkers()}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  cameraIcon: {
    top: 0
  }
});