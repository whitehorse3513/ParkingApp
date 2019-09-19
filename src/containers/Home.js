import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text, TouchableOpacity, TextInput, Button, Alert
} from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      currentUser: null
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  handleEnter = () => {

  }

  handleLogout = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate('login')
  }

  render() {
    const { currentUser } = this.state
    console.log(currentUser)
    return (
      <View style={styles.container}>
        <View style={{ padding: 10, flex: 1, maxHeight: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Ionicons
              onPress={() => this.props.navigation.openDrawer()}
              name="ios-menu"
              color="#fff"
              size={30}
              style={{ padding: 5 }}></Ionicons>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#f00', fontSize: 40, fontWeight: "700" }}>P
              <MaterialIcons name="car" size={40} color="#f00" style={{ transform: [{ rotate: '-5deg' }], marginBottom: 20 }}></MaterialIcons>
              rky</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            {currentUser != null && currentUser.email != "" ?
              <Text
                onPress={this.handleLogout}
                style={{ textDecorationLine: 'underline', color: "#bbb", fontSize: 18 }}>Logout</Text>
              :
              <Text
                onPress={() => { this.props.navigation.navigate('login') }}
                style={{ textDecorationLine: 'underline', color: "#bbb", fontSize: 18 }}>Login</Text>
            }
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ maxHeight: 200, padding: 10, flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 30, alignContent: 'center' }}>Where are you parking?</Text>
            {/* <TextInput
            placeholderTextColor="#fff"
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Enter a destination or Location ID"
            placeholderTextColor="#bbb"
            onChangeText={location => this.setState({ location })}
            value={this.state.location}
          /> */}
            <GooglePlacesAutocomplete
              placeholder='Enter a destination or Location ID'
              minLength={2}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              onPress={(data, details = null) => {
                console.log(data, details);
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyBq3im1tdKjgoPHN6DxyORWLhZRkbTCLno',
                language: 'en', // language of the results
                types: '(cities)' // default: 'geocode'
              }}
              styles={{
                textInputContainer: {
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth: 0
                },
                description: {
                  color: '#fff'
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 0,
                  height: 42,
                  color: '#fff',
                  fontSize: 18,
                  backgroundColor: 'transparant',
                  borderBottomWidth: 1,
                  borderColor: 'grey'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
              }}
              currentLocation={false}
            />
            {/* <Button title="Enter" color="#e93766" onPress={this.handleEnter} /> */}
          </View>
        </View>
        <Text
          onPress={() => { this.props.navigation.navigate('login') }}
          style={{ textDecorationLine: 'underline', position: 'absolute', bottom: 15, left: 10, color: "#bbb", fontSize: 15 }}>I don't know yet</Text>
        <Text
          onPress={() => { this.props.navigation.navigate('login') }}
          style={{ textDecorationLine: 'underline', position: 'absolute', bottom: 15, right: 10, color: "#bbb", fontSize: 15 }}>Private Policy</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
