import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text, TouchableOpacity, TextInput, Button
} from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';


export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null
    }
  }

  emialLogin() {

    firebase.auth()
      .signInAnonymously()
      .then(credential => {
        if (credential) {
          console.log('default app user ->', credential.user.toJSON());
        }
      })
      .catch(error => {
        console.log('error ->', error);
      });
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((credential) => {
        // this.props.navigation.navigate('Home')
        console.log('createUserWithEmailAndPassword', credential.user.toJSON());
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  async handleGoogleLogin() {
    try {
      //   // add any configuration settings here:
      // await GoogleSignin.configure();
      GoogleSignin.configure({
        offlineAccess: true,
        webClientId: '32605647887-01d807jip2es891g8i47bvqvkj5qk87u.apps.googleusercontent.com'
      });

      const data = await GoogleSignin.signIn();
      console.log('google data', data);
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

      console.log('google signin', firebaseUserCredential.user);
      this.props.navigation.navigate('home')
    } catch (error) {

      console.log('google signin error', error, '\n', error.code);
    }
  }

  async handleFacebookLogin() {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request');
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
      console.log(`Login success: ${data.toString()}`);

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

      console.log('fb login: ', firebaseUserCredential.user)
      this.props.navigation.navigate('home')
    } catch (e) {
      console.log('fb login error: ', e);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#1c2530', padding: 15, alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'column' }}>
        <Entypo 
          onPress={() => { this.props.navigation.navigate('home') }}
          name="cross" 
          size={24} 
          color="#fff" 
          style={{ paddingVertical: 5 }}></Entypo>
        <View style={{ paddingBottom: 30 }}>
          <MaterialIcons name="car" size={40} color="#fd0807" style={{ transform: [{ rotate: '-5deg' }], marginBottom: 20 }}></MaterialIcons>
          <Text style={{ color: '#fff', fontSize: 26, marginVertical: 15 }}>You need to sign in or create an account to continue.</Text>
          <TouchableOpacity style={{ backgroundColor: '#33589d', borderRadius: 3, marginVertical: 5, paddingHorizontal: 15, paddingVertical: 5 }}
            onPress={() => { this.handleFacebookLogin() }}>
            <Icon style={{ position: 'absolute', left: 15, top: 13 }} name="facebook-official" size={20} color="#fff" />
            <Text style={{ margin: 10, color: '#fff', textAlign: 'center', fontSize: 15 }}>Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#be403c', borderRadius: 3, marginVertical: 5, paddingHorizontal: 15, paddingVertical: 5 }}
            onPress={() => { this.handleGoogleLogin() }}>
            <Icon style={{ position: 'absolute', left: 15, top: 13 }} name="google" size={20} color="#fff" />
            <Text style={{ margin: 10, color: '#fff', textAlign: 'center', fontSize: 15 }}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ borderWidth: 1, borderColor: '#7f858c', padding: 5, borderRadius: 3, marginVertical: 5 }}
            onPress={() => { this.props.navigation.navigate('fireLogin') }}>
            <Text style={{ margin: 10, color: '#fff', textAlign: 'center', fontSize: 15 }}>Log in with email or phone number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ borderWidth: 1, borderColor: '#7f858c', padding: 5, borderRadius: 3, marginVertical: 5 }}
            onPress={() => { this.props.navigation.navigate('fireSignup') }}>
            <Text style={{ margin: 10, color: '#fff', textAlign: 'center', fontSize: 15 }}>Create account with email & phone number</Text>
          </TouchableOpacity>
          <Text style={{ color: '#8198af', marginVertical: 15, fontSize: 15, lineHeight: 22 }}>
            By proceeding with creating an account you agree to the justPark <Text style={{ textDecorationLine: 'underline' }}>Terms & Conditions</Text> and <Text style={{ textDecorationLine: 'underline' }}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    fontSize: 20,
    width: '90%',
    borderColor: '#9b9b9b',
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15
  }
});
