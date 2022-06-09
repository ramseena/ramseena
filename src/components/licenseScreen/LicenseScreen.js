
import React, { useState, useEffect } from 'react';
import { StyleSheet,Platform, ScrollView, ActivityIndicator,KeyboardAvoidingView, Text, View, TextInput, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import { getLicense } from '../../request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationHelpersContext } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';

const LicenseScreen = ({ navigation, route }) => {
  const deviceType = Platform.OS === 'ios' ? 2 : 3
  const [loading, setLoading] = useState(false);
const [fromPage,setFromPage]= useState("")
  const showToast = (msg) => {
    Toast.show(msg, Toast.SHORT, [
      'UIAlertController',
    ]);
  }

  
  const [license, setLicense] = useState('');
  const registerLicense = async () => {
  if(license)
  {
    let deviceId = DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token")
    const appId = await AsyncStorage.getItem("appId")
    let dname = await DeviceInfo.getDeviceName()
    const network = await NetInfo.fetch();
    
    if (network.isConnected) {
      const licenseData = await getLicense(token, license, deviceId, appId,dname)
      console.log("liic",licenseData)
      if (licenseData.status === 200) {  
        if(licenseData.response.response !=="error")
        {
        setLoading(true)
        setLicense("")

        setLoading(false)
        await AsyncStorage.setItem("clienttoken", licenseData.response.licence.token);
        navigation.navigate('login')
        }
        else{
          showToast(licenseData.response.message)
        }
      } 
      
    }
    else {
     
      showToast("please check your network connection")
    }
  }
  else{
    showToast("please enter license")
  }

  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    
      if(route.params)
      {
        
    setFromPage(route.params.fromPage)
      }
    });
    return unsubscribe;
  }, [route]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />

      </View>
    );
  }

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} forceInset={{ top: 'never' }}>

      <StatusBar barStyle="light-content" hidden={false} backgroundColor="orange" translucent={true} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>

     
        <View style={{ flex: 1 }}>
        {fromPage?<TouchableOpacity  style={{alignItems:"flex-end",padding:20,paddingTop: deviceType === 2 ? "1%" : "12%" }} onPress={()=>fromPage==='login'?navigation.navigate("login"):navigation.navigate('Add Shop')}><Image source={require('../../images/close1.png')} style={{ width: 20, height: 20, resizeMode: "center" }}></Image></TouchableOpacity>:null}


          <View style={{ flex: .5, paddingTop: 80}}>
         
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>
              <Image source={require('../../images/playstore.png')}style={{width:200,height:250,resizeMode:"contain"}}></Image>

            </View>



          </View>


          <View style={{ flex: .5, justifyContent: 'center' }}>

            <TextInput
              placeholder="Enter Licence Key Here"
              placeholderTextColor="grey"
              label='Licence'
              onChangeText={setLicense}
              clearButtonMode="always"
              selectTextOnFocus={true}
              value={license}
              style={styles.input}
            />


            <TouchableOpacity
              style={styles.button}
              onPress={()=>registerLicense()}
            >
              <Text style={{ color: "#FFFFFF" }}>GET LICENCE</Text>

            </TouchableOpacity>


          </View>

          <View style={{ flex: .3 }}>

          </View>


        </View>




      </ScrollView>
     
    </SafeAreaView>


  );
};

export default LicenseScreen

const styles = StyleSheet.create({

  button: {

    backgroundColor: "#f47822",
    alignItems: "center",
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 5

  },


  lottie: {
    width: 100,
    height: 100,
  },

  inputn: {

    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    padding: 20,
  },



  input: {

    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f47822',
    marginBottom: 10,
  },

});


