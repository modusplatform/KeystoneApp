import React, { Component } from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.signInGoogle = this.signInGoogle.bind(this);
    }

    signInGoogle = () => {
        GoogleSignin.signIn()
        .then(user => {
            const { idToken, serverAuthCode } = user;
            const credential = { token: idToken, secret: serverAuthCode, provider: 'google', providerId: 'google' };
            return firebase.auth().signInWithCredential(credential);
        })
        .then(user => {
            //dispatch user here
            console.log(user);
        })
        .catch(err => {
            console.log('Error on signin: ', err);
        })
        
        
    }

    componentWillMount() {
        GoogleSignin.configure({
            webClientId: '324888995775-lb1kvka12apkncuboalbbief3298gqmt.apps.googleusercontent.com'
        })
    }

    render() {
        return (
            <View>
                <GoogleSigninButton
                    style={{ width: 48, height: 48 }}
                    size={ Size.Standard }
                    color={ Color.Dark }
                    onPress={ this.signInGoogle }
                />
        
            </View>
        );
    }

}

mapStateToProps = ({ auth }) => {
    return {
        authUser: auth.authUser
    }
}

export default SignInForm;
