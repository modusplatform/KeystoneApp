import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/Colors';
import { Font } from 'expo';
import SignInForm from '../components/auth/SignInForm';

class IntroScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'lato': require('../assets/fonts/Lato-Regular.ttf'),
      'light': require('../assets/fonts/Lato-Light.ttf'),
      'semibold': require('../assets/fonts/Lato-Semibold.ttf'),
      'thin': require('../assets/fonts/Lato-Thin.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.fontLoaded && 
        <View>
          <Text h1 fontFamily="semibold" style={styles.header}>MODUS</Text>
          <Text h2 fontFamily="light" style={styles.subheader}>Keystone</Text>
          <SignInForm />
        </View>
        }
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingLeft: 30,
  },
  header: {
    textAlign: "left",
    fontSize: 50,
    color: Colors.primaryBlue
  },
  subheader: {
    textAlign: "left",
    fontSize: 35,
    color: Colors.coral
  }
});

export default IntroScreen;
