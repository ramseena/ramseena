
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StatusBar, Text,Switch, FlatList, ActivityIndicator, Platform, SafeAreaView, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBankOrCashBook, getDetails } from './../../request'
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import {rounder} from './../../common/helper'

const CashScreen = ({ route, navigation }) => {
  const [decimal, setDecimal] = useState("");
  const [bankDatas, setBankData] = useState("");
  const [todayData, setTodayData] = useState("");
  const [yesterdayData, setYesterdayData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [toggled, setToggled] = useState(false);
  
  const showToast = (msg) => {
    Toast.show(msg, Toast.SHORT, [
      'UIAlertController',
    ]);
  };
  
  const toggleSwitch=(name)=>{
  
    setToggled(name)
   
    setIsEnabled(previousState => !previousState);
  
  }
  const getData = async () => {

    const decimal =  await AsyncStorage.getItem("decimals");
    setDecimal(decimal)
    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");
    const network = await NetInfo.fetch();
    if (network.isConnected) {
      setLoading(true)
      const listDetails = await getDetails(clienttoken, token, "Cash Book", deviceId, route.params.value,toggled)
      
      if(listDetails)
      {
      setLoading(false)
      setTodayData(listDetails.data.today);
      setYesterdayData(listDetails.data.yesterday)
      setBankData(listDetails.data)
      }
    }
    else {
     
      showToast("please check your network connection")
    }
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    setIsEnabled(false)
    setToggled(false)
      getData()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [route.params.value ]);
  useEffect(()=>{
getData()
  },[toggled])
  const data ="Add Shop"
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />

      </View>
    );
  }
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4', justifyContent: "center", alignContent: "center", marginTop: StatusBar.currentHeight }}>

      <StatusBar barStyle="light-content" hidden={false} backgroundColor="orange" translucent={true} />
      <View style={{ flex: 1, backgroundColor: '#f1f2f4' ,margin:20}}>

          <Header name ="Add Shop" screenName="Cash Book"/>
         
          <View style={{ flex: 1, backgroundColor: '#f1f2f4' ,margin:20}}>
       
        
          <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
           <Text>Show Grouped Data</Text>
      <Switch
        trackColor={{ false: "#767577", true: "BLUE" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>

            <TouchableOpacity style={styles.boxView} onPress={() => navigation.navigate("CashBookDetail", { data: todayData.details, date: todayData.date, totcredit: todayData.total_credit, totdebit: todayData.total_debit, name: todayData.name ,code:route.params.value})}>
             
                <View style={{ flexDirection: "row" }}>
                  <Text  style={[styles.boxTextTag,{color:"blue"}]}>Date</Text>
                  <Text style={[styles.boxText,{color:"blue"}]}>{todayData.date}</Text>
                </View>

                <View style={{ flexDirection: "row" ,alignItems:"flex-start"}}>
               <Text style={styles.boxTextTag}>Opening Balance</Text>
               <Text style={[styles.boxText,{fontWeight:"bold",color:"#000"}]}>{rounder(todayData.opening_balance,decimal)}</Text>
             </View>
             <View style={{ flexDirection: "row" ,alignItems:"flex-start"}}>
               <Text  style={[styles.boxTextTag,{color:"green"}]}>Total Debit</Text>
               <Text style={[styles.boxText,{color:"green"}]}>{rounder(todayData.total_debit,decimal)}</Text>
             </View>
            
             <View style={{ flexDirection: "row" ,alignItems:"flex-start",justifyContent:"flex-start"}}>
               <Text style={[styles.boxTextTag,{color:"red"}]}>Total credit</Text>
               <Text style={[styles.boxText,{color:"red"}]}>{rounder(todayData.total_credit,decimal)}</Text>
             </View>
             
             <View style={{ flexDirection: "row" ,alignItems:"flex-start"}}>
               <Text style={styles.boxTextTag}>Closing Balance</Text>
               <Text style={[styles.boxText,{fontWeight:"bold",color:"#000"}]}>{rounder(todayData.closing_balance,decimal)}</Text>
             </View>



            

            </TouchableOpacity>
            <TouchableOpacity style={styles.boxView} onPress={() => navigation.navigate("CashBookDetail", { data: yesterdayData.details, date: yesterdayData.date, totcredit: yesterdayData.total_credit, totdebit: yesterdayData.total_debit, name: yesterdayData.name,code:route.params.value })} >
             
             
             <View style={{ flexDirection: "row" }}>
            <Text style={[styles.boxTextTag,{color:"blue"}]}>Date</Text>
            <Text style={[styles.boxText,{color:"blue"}]}>{yesterdayData.date}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.boxTextTag}>Opening Balance</Text>
            <Text style={[styles.boxText,{fontWeight:"bold",color:"#000"}]}>{rounder(yesterdayData.opening_balance,decimal)}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text  style={[styles.boxTextTag,{color:"green"}]}>Total Debit</Text>
            <Text style={[styles.boxText,{color:"green"}]}>{rounder(yesterdayData.total_debit,decimal)}</Text>
          </View>

         
          <View style={{ flexDirection: "row" }}>
            <Text  style={[styles.boxTextTag,{color:"red"}]}>Total credit</Text>
            <Text style={[styles.boxText,{color:"red"}]}>{rounder(yesterdayData.total_credit,decimal)}</Text>
          </View>
         
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.boxTextTag}>Closing Balance</Text>
            <Text style={[styles.boxText,{fontWeight:"bold",color:"#000"}]}>{rounder(yesterdayData.closing_balance,decimal)}</Text>
          </View>



         

         </TouchableOpacity>
 
</View>

      </View>

    </SafeAreaView>

  );
};

export default CashScreen

const styles = StyleSheet.create({


  button: {
    backgroundColor: "#000000",
    alignItems: "center",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20

  },

  lottie: {
    width: 100,
    height: 100,
  },
  boxImage: {
    width: 50,
    height: 60,
    resizeMode: 'stretch'
  },
  boxImageHead: {
    width: 40,
    height: 40,
    resizeMode: 'stretch'
  },


  boxText: {
    color: "#008000",
    padding: 5,
    textAlign: "left",
    fontWeight: 'bold',



  },
  boxTextTag: {
    padding: 5, flex: 1,
    textAlign: "left",
    fontWeight: 'bold',color:"#000"



  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxTextBold: {

    padding: 5,
    fontSize: 25,
    color: "#000000",
    textAlign: "center",
    fontWeight: 'bold'



  },

  boxView: {
    padding: 20,
    borderRadius: 10,

    backgroundColor: '#ffffff',
    
    
    marginTop: 20,
    justifyContent: 'flex-start',alignItems:"flex-start",
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
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
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20
  },

  footerText: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center'
  },




});
