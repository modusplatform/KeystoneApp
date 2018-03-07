import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

class SigninScreen extends Component {
  constructor(props) {
    super(props);
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