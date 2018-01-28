import React, { Component } from 'react';
import { ARKit } from 'react-native-arkit';
import { View } from 'react-native';

const diffuse = '#88ff88cc';

export default class ARView extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ARKit
          style={{ flex: 1 }}
          debug
          planeDetection
          lightEstimation
          onPlaneDetected={console.log} // event listener for plane detection
          onPlaneUpdate={console.log} // event listener for plane update
        >
          <ARKit.Text
            text="Welcome to Keystone by Modus!"
            frame="FrontOfCamera"
            position={{ x: 0, y: 0, z: 0 }}

            font={{ size: 0.01, depth: 0.002 }}
            material={{ diffuse: 'blue' }}
          />
        </ARKit>
      </View>
    )
  }
}