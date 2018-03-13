// import React, { Component } from 'react';
// import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { AppLoading, Asset, Font } from 'expo';
// import { Ionicons } from '@expo/vector-icons';
// import RootNavigation from './navigation/RootNavigation';
// import { Provider } from 'react-redux';
// import initStore from './redux/store';
// import { initializeApp } from 'firebase';

// const store = initStore();

// export default class App extends Component {
//   // constructor() {
//   //   super();

//   //   this.state = {
//   //     loading: true,
//   //   };

//   //   this.store = initStore();
//   // }

//   state = {
//     isLoadingComplete: false,
//   };

//   componentWillMount() {
//     initializeApp({
//       apiKey: "AIzaSyB0sFD0QdnwiRjBAnZ0IBze3Sdh-ONHPeA",
//       authDomain: "modus-dev-us.firebaseapp.com",
//       databaseURL: "https://modus-dev-us.firebaseio.com",
//       projectId: "modus-dev-us",
//       storageBucket: "modus-dev-us.appspot.com",
//       messagingSenderId: "324888995775"
//     });
//   }

//   render() {
//     if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
//       return (
//         <AppLoading
//           startAsync={this._loadResourcesAsync}
//           onError={this._handleLoadingError}
//           onFinish={this._handleFinishLoading}
//         />
//       );
//     } else {
//       return (
//         <View style={styles.container}>
//           {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//           {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
//           <RootNavigation />
//         </View>
//       );
//     }
//   }  

//     // return (
//     //   <Provider store={store}>
//     //     { this.state.loading ?
//     //       <AppLoading
//     //         startAsync={this._loadResourcesAsync}
//     //         onError={this._handleLoadingError}
//     //         onFinish={this._handleFinishLoading}
//     //       />
//     //     :
//     //     <View style={styles.container}>
//     //       {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//     //       {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
//     //       <RootNavigation />
//     //     </View>
//     //     }
//     //   </Provider>
//     // );

//   }

//   _loadResourcesAsync = async () => {
//     return Promise.all([
//       Asset.loadAsync([
//         require('./assets/images/robot-dev.png'),
//         require('./assets/images/robot-prod.png'),
//       ]),
//       Font.loadAsync({
//         // This is the font that we are using for our tab bar
//         ...Ionicons.font,
//         // We include SpaceMono because we use it in HomeScreen.js. Feel free
//         // to remove this if you are not using it in your app
//         'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
//       }),
//     ]);
//   };

//   _handleLoadingError = error => {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error);
//   };

//   _handleFinishLoading = () => {
//     this.setState({ isLoadingComplete: true });
//   };
  
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   statusBarUnderlay: {
//     height: 24,
//     backgroundColor: 'rgba(0,0,0,0.2)',
//   },
// });

import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import { initializeApp } from 'firebase';
import { Provider } from 'react-redux';
import initStore from './redux/store';

const store = initStore();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentWillMount() {
    initializeApp({
      apiKey: "AIzaSyB0sFD0QdnwiRjBAnZ0IBze3Sdh-ONHPeA",
      authDomain: "modus-dev-us.firebaseapp.com",
      databaseURL: "https://modus-dev-us.firebaseio.com",
      projectId: "modus-dev-us",
      storageBucket: "modus-dev-us.appspot.com",
      messagingSenderId: "324888995775"
    });
  }

    render() {
      return (
        <Provider store={store}>
          { this.state.isLoadingComplete ?
            <AppLoading
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
            />
            :
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
              <RootNavigation />
            </View>
          }
        </Provider>
      );
    }

  // render() {
  //   if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
  //     return (
  //       <AppLoading
  //         startAsync={this._loadResourcesAsync}
  //         onError={this._handleLoadingError}
  //         onFinish={this._handleFinishLoading}
  //       />
  //     );
  //   } else {
  //     return (
  //       <View style={styles.container}>
  //         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
  //         {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
  //         <RootNavigation />
  //       </View>
  //     );
  //   }
  // }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});