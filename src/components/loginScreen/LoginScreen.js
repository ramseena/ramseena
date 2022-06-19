
import React, { useState,useEffect } from 'react';
import { AuthContext } from '../../components/context';
import { StyleSheet, Text, View, BackHandler,Image,TextInput, ScrollView,SafeAreaView,StatusBar,TouchableOpacity ,ActivityIndicator,Alert} from 'react-native';
import Toast from 'react-native-simple-toast';
import { loginRequest ,getUser} from '../../request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo"; 
import DeviceInfo from 'react-native-device-info';


function LoginScreen({ navigation,route }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shopName,setShopName] = useState("")
  const [expiry,setExpiry] = useState("")
  const [loading, setLoading] = useState(false);
  const getShop = async()=>
    {
  const shopname =  await AsyncStorage.getItem("shopName")
  const expiry =  await AsyncStorage.getItem("expiry")
  setExpiry(expiry)
  setShopName(shopname);
    }
    const { signIn} = React.useContext(AuthContext);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getShop();
    });
  // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]); 


  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const showToast = (msg) => {
    Toast.show(msg, Toast.LONG, [
      'UIAlertController',
    ]);
  };
  const login = async () => {
    const clienttoken = await AsyncStorage.getItem("clienttoken");
    if (username && password) {
    
      let deviceId = await DeviceInfo.getUniqueId()
      const token = await AsyncStorage.getItem("token");
      
   
      const network  = await NetInfo.fetch();
      if(network.isConnected)
      {
          
        if(clienttoken)
        {
          setLoading(true)
          
      const loginResult = await loginRequest(clienttoken, token,username.toUpperCase(),password.toUpperCase(),deviceId);
     
      if (loginResult.status === 200) {
        if(loginResult.response.response !== "failed")
        {
        setPassword("");
        setUsername("");
        setLoading(false)
        console.log(loginResult.response,"data",loginResult.response.data)
       // AsyncStorage.setItem("isLoggedIn","true")
        AsyncStorage.setItem("shopName",loginResult.response.shop_name)
        AsyncStorage.setItem("loggedInUser",loginResult.response.shop_name)
        AsyncStorage.setItem("userName",loginResult.response.data.username)
        AsyncStorage.setItem("TIME",loginResult.response.updation_time)
        signIn(username);
        
       // navigation.navigate("Add Shop")
        
        
        return;
        }
        else
        {
          setLoading(false)
          showToast(loginResult.response.message)
        }
      }
      else if(loginResult.status === 300)
      {
        
        setLoading(false)
        alert("licence expired");
       
      }
      else{
        setLoading(false)
        alert("invalid username or password");
      }
    }
    else{
    
      //setLoading(false)
      showToast("please add a shop");
    }
    }
    else{
      
      showToast("please check your network connection")
      setLoading(false)
    }
      
    }
    if(clienttoken)
    {

    if (!username) {
      showToast("please enter username!");

    }
    if (!password) {
      showToast("please enter password");
    }
    if (!username && !password) {
      showToast("please enter username and password");
    }
  }
  else{
    showToast("please add shop");
  }


  };
  const switchUser = async () => {
    
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");


    const network = await NetInfo.fetch();
    console.log("tokennn",token,deviceId)
    if (network.isConnected) {
console.log(token,deviceId)
try
{
      const data = await getUser(token, deviceId)
      
  
      if(data){
        console.log("switch",data)
        navigation.navigate("SwitchScreen",{data:data})
      }
    }
    catch(error)
    {
      console.log("err",error)
alert("err")
    }
    }
    else {
      showToast("please check your network connection")
    }
  }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />

      </View>
    );
  }
  const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} forceInset={{ top: 'never' }}>

      <StatusBar barStyle="light-content" hidden={false} backgroundColor="orange" translucent={true} />
<ScrollView style={{flex:1}}>

   <View style={{flex:1}}>
      
   
   <View style={{flex:.2,paddingTop:'15%'}}>
   
   <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginBottom:5}}>
         <Image source={require('./../../images/playstore.png')} style={{width:200,height:250,resizeMode:"contain"}}></Image>
         
   </View>

{shopName?<View>
  <Text style={{textAlign:"center",padding:5,color:"#000"}}>Current Shop:</Text>
  <Text style={{textAlign:"center",padding:5,color:"#000"}}>{shopName}</Text></View>:null}
  </View>

  

   <View style={{flex:.5, justifyContent:'center'}}>
  
       <TextInput
           placeholder="Enter User Name"
          
      placeholderTextColor="grey"
          label='Email'
          autoCapitalize="characters"
          onChangeText={setUsername} 
          value={username}
          style={styles.input}
       />
       <TextInput
     value={password}
     placeholder="Enter password"
     placeholderTextColor="grey"
         label='Password'
         autoCapitalize="characters"
         onChangeText={setPassword} 
         secureTextEntry={true}
         style={styles.input}
       />
      
     
       <TouchableOpacity
       style={styles.button}
       onPress={()=>login()}
     >
       <Text style={{color:"#FFFFFF",fontSize:19}}>Login</Text>
    
</TouchableOpacity>
     <View style={{flexDirection:"row",justifyContent:"space-between"}}>
     <TouchableOpacity onPress={()=>navigation.navigate("license",{fromPage:"login"})}><Text style={{textAlign:'left',paddingLeft:20,marginTop:10,fontSize:17,color:"#000"}}>Add Shop</Text></TouchableOpacity>
     <TouchableOpacity onPress={()=>switchUser()}><Text style={{textAlign:'right',paddingRight:20,marginTop:10,fontSize:17,color:"#000"}}>Switch Shop</Text></TouchableOpacity>
</View>


     </View>

     <View style={{flex:.3}}>
     
   </View>
   

 
  

  </View>
  </ScrollView>

  </SafeAreaView>

   
 );
};

export default LoginScreen
const styles = StyleSheet.create({

 button: {

   backgroundColor:"#f47822",
   alignItems: "center",
   padding: 15,
   marginLeft:20,
   marginRight:20,
   marginTop:20,
   borderRadius:5
  
 },



 inputn: {
borderColor:"#f47822",
   height: 40,
   marginLeft: 20,
   marginRight: 20,
   marginTop:5,
   marginBottom:5,
   borderWidth: 1,
   padding: 20,
 },

 lottie: {
  width: 100,
  height: 100,
},

input: {
color:"#000",
 marginLeft:20,
 marginRight:20,
 marginTop:5,
 padding: 10,
 borderWidth: 1,
 borderColor: '#f47822',
 marginBottom: 10,
},

});
