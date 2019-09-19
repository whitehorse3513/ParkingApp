import React from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Home", "Chat", "Profile"];

export default class SideBar extends React.Component {
  render() {
    return (
    //   <Container>
    //     <Content>
    //       <Image
    //         source={{
    //           uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
    //         }}
    //         style={{
    //           height: 120,
    //           alignSelf: "stretch",
    //           justifyContent: "center",
    //           alignItems: "center"
    //         }}>
    //         {/* <Image
    //           square
    //           style={{ height: 80, width: 70 }}
    //           source={{
    //             uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
    //           }}
    //         /> */}
    //       </Image>
    //       <List
    //         dataArray={routes}
    //         renderRow={data => {
    //           return (
    //             <ListItem
    //               button
    //               onPress={() => this.props.navigation.navigate(data)}>
    //               <Text>{data}</Text>
    //             </ListItem>
    //           );
    //         }}
    //       />
    //     </Content>
    //   </Container>
      <View style={{ flex:1, backgroundColor:'#1c2530', justifyContent:'space-between', }}>
        <View style={{ marginHorizontal:20, marginVertical:10, }} >
          <MaterialIcons name="car" size={40} color="#fd0807" style={{ transform: [{ rotate: '-5deg' }], marginBottom: 20 }}></MaterialIcons>
        </View>
        <View style={{ flex:1, padding:20,}}>
          <TouchableOpacity onPress={()=> {this.props.navigation.navigate('myBookings')} }>
            <Text style={styles.text_btns}>My bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {this.props.navigation.navigate('rentOutSpace')} }>
            <Text style={styles.text_btns}>Rent out your space</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.imageContainer}></View>
          <View style={{ marginLeft:30, }}>
            <Text style={{ color:'#fff', fontSize:16 }}>Sign In</Text>
          </View>
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  text_btns: {
    color:'#fff', fontSize:20, paddingVertical:10
  },
  bottomContainer:{
    paddingHorizontal:20, flex:0.2, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'
  },
  imageContainer: {
    height:60, width:60, borderRadius:60, backgroundColor:'grey'
  }
});