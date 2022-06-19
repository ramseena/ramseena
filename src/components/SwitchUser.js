import React, { useState, useEffect } from 'react';
import { AuthContext } from '../components/context';
import { StyleSheet, SafeAreaView, StatusBar, Text, View, FlatList, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

import Header from '../common/Header';
const SwitchUser = ({ route,navigation }) => {
  console.log("route",route.params.data.data)
  const [userData, setUserData] = useState(route.params.data.data);
  const [loggedIn, setLoggedIn] = useState("");
  const [selectedShop,setSelectedShop]=useState();
  const { signOut } = React.useContext(AuthContext);
  const chngetoken = async (data) => {
    AsyncStorage.setItem("shopName",data.name)
    await AsyncStorage.setItem("clienttoken", data.client_token);
 
   if(data.username)
   {
    setSelectedShop(data.name)
   

    AsyncStorage.setItem("userName",data.username)
    AsyncStorage.setItem("decimals",JSON.stringify(data.decimals))
    AsyncStorage.setItem("expiry",data.expires_on)
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    setLoggedIn(isLoggedIn)

    if(isLoggedIn === "true")
    {
    navigation.navigate("Add Shop")
    }
    else{
    
     signOut()
    }
}
else{
    signOut("switch")
}
  
  }
  const Item = ({ item }) => {
console.log("it",item)
    return (
      <View >
        <TouchableOpacity onPress={() => chngetoken(item)} style={{ color:"#000",borderColor:item.client_token ==selectedShop? "green":"#fff" ,borderWidth:1,borderRadius:15,justifyContent: "center", margin: 10, padding: 20, alignItems: "center", backgroundColor:item.client_token ==selectedShop? "#e4f5a6":"#fff" }}><Text style={{ color: "#000",fontWeight:"bold"}}>{item.name}</Text></TouchableOpacity>
      </View>)
  }
  const findUser = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    setLoggedIn(isLoggedIn)
    setUserData(route.params.data.data)
    const clienttoken = await AsyncStorage.getItem("clienttoken");
    setSelectedShop(clienttoken)
  }
  React.useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      findUser() 
    });
  
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[route.params.data.data]);
  console.log("kooooooooi")
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4' }}>
      <View style={{ flex: 1, backgroundColor: '#f1f2f4' }}>
        <View style={{ backgroundColor: '#f1f2f4', alignItems: "flex-start" ,margin:30}}>

        
        <View style={{ flexDirection: "row" ,marginTop:"3%"}} >
        <TouchableOpacity style={{width:60}}onPress={() => loggedIn==="true"?navigation.navigate("Add Shop"):navigation.navigate("login")}>
          <Image source={require('../images/back_round.png')} style={{ width: 38, height: 38 ,resizeMode:"contain"}}></Image>
        </TouchableOpacity>
        <View style={{justifyContent:'center',alignItems:"center"}}><Text style={{textAlign:"center",marginLeft:20, color: "#000", fontSize: 15, fontWeight: "500" }}>{"Switch Shops"}</Text></View>
      </View>


        </View>

        <View style={{ flex: 1, backgroundColor: '#f1f2f4', marginTop: -0, alignItems: 'center', justifyContent: 'center' }}>
         
        
       <View style={{marginTop:"10%"}}>
          <FlatList
            numColumns={1}
            data={userData}
            extraData={userData}
            renderItem={({ item }) => <Item item={item} />}

          />
          </View>


        </View>


    
      </View>
    </SafeAreaView>



  );
};


const styles = StyleSheet.create({


  button: {
    backgroundColor: "#000000",
    alignItems: "center",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20

  },
  box: {
    width: 300,
    height: 300


  },
  boxImage: {
    width: 50,
    height: 60
  },
  logout: {
    width: 25,
    height: 25
  },

  boxText: {

    padding: 5,
    textAlign: "center",
    fontWeight: 'bold',



  },

  boxView: {
    height: 150,
    borderRadius: 10,

    backgroundColor: '#ffffff',
    margin: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3
  },

  boxInnerView: {
    alignItems: 'center',
    justifyContent: 'center'
  },


  input: {
    backgroundColor: "#ffffff",
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    padding: 5,
  },

  titleText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20, margin: 10
  },

  footerText: {
    color: '#000000',
    fontSize: 15,
    textAlign: 'center'
  },




});



export default SwitchUser;