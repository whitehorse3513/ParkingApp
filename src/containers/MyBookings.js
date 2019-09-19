import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text, TouchableOpacity, TextInput, Button, Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class MyBookings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }
  }

  render() {
    const { currentUser } = this.state
    console.log(currentUser)
    return (
      <View style={styles.container}>
        <Ionicons 
          onPress={() => { this.props.navigation.goBack() }} 
          name="ios-arrow-round-back" 
          color="#fff" size={30} 
          style={{ padding: 5, position: 'absolute', left: 10, top: 10 }}></Ionicons>
        <Text style={{ color:'#fff' }}>My Bookings</Text>
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
});
