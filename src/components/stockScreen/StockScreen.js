
import React, { useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StatusBar,Text,ActivityIndicator ,Platform,SafeAreaView,StyleSheet,Button,TouchableOpacity,Image} from 'react-native';
import { stockReport } from '../../request';
import Header from '../../common/Header';
import {rounder} from './../../common/helper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo"; 
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
const StockScreen =({navigation,route}) =>{
  
    const [stockData, setStockData] = useState("");
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setStockData(route.params.data) 
      });
    
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [route]);
    const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
  
        </View>
      );
    }
  return (
      
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4',marginTop:StatusBar.currentHeight }}>
       
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "orange" translucent = {true}/>
        <View style={{ backgroundColor: '#f1f2f4' ,alignItems:"flex-start",margin:15}}>
      
<Header name ="Add Shop" screenName="Stock Details"/>
                </View>
       



 

   

   <View style={{flex:1,marginTop:10}}>
   <TouchableOpacity style={styles.boxView}>
   <View style={styles.boxInnerView}>
      <Image source={require('../../images/warehouse.png')} style={styles.boxImage}></Image>
      </View>
      <Text style={styles.boxText}>{stockData.date}</Text>
      <Text style={styles.boxText}>Stock Available:</Text>
      <Text style={styles.boxTextBold}>{rounder(stockData.amount)}</Text>
      </TouchableOpacity>

   

   
</View>


 
</SafeAreaView>

        
       
      
   
  );
}

const styles = StyleSheet.create({
 
 
  button: {
    backgroundColor:"#000000",
    alignItems: "center",
    padding: 10,
    marginLeft:20,
    marginRight:20,
    marginTop:20
   
  },

  boxImage:{
    width:50,
    height:60,
    resizeMode: 'stretch'
  },
  boxImageHead:{
   width:40,
   height:40,
   resizeMode: 'stretch'
 },


  boxText: {

    padding:5,
    textAlign: "center",
    fontWeight:'bold',
    color:"#000"
    
  
   
  },
  boxTextBold: {

   padding:5,
   fontSize:25,
   color:"#000000",
   textAlign: "center",
   fontWeight:'bold',
   
 
  
 },
 lottie: {
  width: 100,
  height: 100,
},

  boxView:{
    padding:50,
    borderRadius:10,
  
    backgroundColor:'#ffffff',
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3
  },

  boxInnerView:{
    alignItems:'center',
    justifyContent:'center'
  },


  input: {
    backgroundColor:"#ffffff",
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop:5,
    marginBottom:5,
    borderWidth: 1,
    padding: 5,
  },

  titleText: {
   color:'#FFFFFF',
   fontWeight: 'bold',
   fontSize:20
  },

  footerText: {
    color:'#fff',
    fontSize:15,
    textAlign:'center'
   },
 


 
});

export default StockScreen