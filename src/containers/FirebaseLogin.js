import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text, TouchableOpacity, TextInput, Button, Alert
} from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class FirebaseLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null
    }
  }

  handleLogin = () => {
    if (this.state.email && this.state.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((credential) => {
          console.log('signInWithEmailAndPassword', credential.user.toJSON());
          this.props.navigation.navigate('home')
        })
        .catch(error => {
          console.log('error', error);
          this.setState({ errorMessage: error.message })
        })
    } else {
      Alert.alert('Oops', 'Enter email and password');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Ionicons 
          onPress={() => { this.props.navigation.navigate('login') }} 
          name="ios-arrow-round-back" 
          color="#fff" size={30} 
          style={{ padding: 5, position: 'absolute', left: 10, top: 10 }}></Ionicons>

        <Text style={{ color: '#fff', fontSize: 40 }}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholderTextColor="#fff"
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholderTextColor="#fff"
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" color="#e93766" onPress={this.handleLogin} />
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#fff' }}> Don't have an account? <Text onPress={() => this.props.navigation.navigate('fireSignup')} style={{ color: '#e93766', fontSize: 18 }}> Sign Up </Text></Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c2530'
  },
  textInput: {
    color: '#fff',
    height: 45,
    fontSize: 20,
    width: '90%',
    borderColor: '#9b9b9b',
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15
  }
});
