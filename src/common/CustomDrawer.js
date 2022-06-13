import React, { useState, useEffect } from 'react';
import {View,SafeAreaView, Text,Image,StyleSheet,StatusBar,TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';
import { getUser} from '../request';
import Toast from 'react-native-simple-toast';
const CustomDrawer = (props) =>{
  const [userName, setUserName] = useState("");
  const [time,setTime] = useState("");
  const [expiry,setExpiry] = useState("")
  const showToast = (msg) => {
    Toast.show(msg, Toast.SHORT, [
      'UIAlertController',
    ]);
  };
  const handleSwitchShop =async()=>{
    
      let deviceId = await DeviceInfo.getUniqueId()
      const token = await AsyncStorage.getItem("token");
  
  
      const network = await NetInfo.fetch();
      if (network.isConnected) {

        const data = await getUser(token, deviceId)
      
        if(data){
          props.navigation.navigate("SwitchScreen",{data:data})
        }
  
      }
      else {
        showToast("please check your network connection")
      }
    }
    
  
  const handleAddShop =async()=>{
    //await AsyncStorage.removeItem("isLoggedIn");
   
   props.navigation.navigate('license',{fromPage:"switch"})
  //props.navigation.goBack()
   
  }
const SingleComponent=(obj)=>
{
  return(
    <TouchableOpacity  onPress={() => obj.id ===1?handleAddShop():handleSwitchShop()}>
    <View style={styles.singleRow}>
    <Image source={obj.id ===1?require("./../images/addshop.png"):require("./../images/changeshop.png")}  style={{width:30, height:30,borderRadius:15,flex:1,resizeMode:"contain"}} />
    <Text style={styles.rowText}>{obj.name}</Text>
    </View>
   
    </TouchableOpacity>
  );
}

const getShop = async () => {
  
  const userName = await AsyncStorage.getItem("userName");
  const time = await AsyncStorage.getItem("TIME");
  const expiry =  await AsyncStorage.getItem("expiry")
  setExpiry(expiry)
  setTime(time)
  setUserName(userName)
}

useEffect(() => {
  
    getShop()
  
});
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4', marginTop: StatusBar.currentHeight }}>
         <StatusBar barStyle="light-content" hidden={false} backgroundColor="orange" translucent={true} />
    <View style={styles.container}>
      <View style={styles.profileView}>
      <Image source={require("./../images/account.png")}  style={{width:100, height:100,borderRadius:50}} />
      <Text style={styles.profileText}>{userName}</Text>
      {/* <Text style={styles.profileText}>LAST SYNCED :{time}</Text> */}
      { expiry?<View>
  <Text style={{textAlign:"center",padding:5,color:"#000"}}>Expires On:</Text>
  <Text style={{textAlign:"center",padding:5,color:"#000"}}>{expiry}</Text></View>:null}
   
      </View>
      <SingleComponent name="Add shop" id={1}/>
      <SingleComponent  name="Switch shop" id={2}/>
    
    </View>
    </SafeAreaView>
  );
};
export default CustomDrawer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    
  },
  profileView:{height:200,justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#ebeced",marginTop:"4%"},
  singleRow:{padding:15,borderBottomWidth:1,borderColor:"#ebeced",marginLeft:"2%",flexDirection:"row",backgroundColor:"f7921e",justifyContent:"center",alignItems:"center",alignContent:"center"},
  logo:{
    fontWeight:"bold",
    fontSize:25,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#ebeced",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#000"
  },
  profileText:{marginTop:"2%",fontWeight:"bold",padding:10,color:"#000"},
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#f7921e",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },rowText:{padding:5,flex:3,textAlign:"left",color:"#000"}
});