
import React, { useState,useEffect } from 'react';
import { View, StatusBar,Text ,Platform,SafeAreaView,StyleSheet,Button,TouchableOpacity,Image} from 'react-native';
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rounder} from './../../common/helper'

const TodaySales =({route,navigation}) =>{
    const { item } = route.params;
    const [decimal, setDecimal] = useState("");
    const getDecimal=async()=>
    {
      const decimals =  await AsyncStorage.getItem("decimals");
     console.log("decc",decimals)
      setDecimal(decimals)
    }
    useEffect(()=>{
      getDecimal();
         
        },[route])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4' ,marginTop:StatusBar.currentHeight}}>
            <View style={{flex:1}}>
                <View style={{ backgroundColor: '#f1f2f4' ,alignItems:"flex-start",margin:20}}>

                   


                    <Header name ="Sales Report" screenName="TODAY SALES SUMMARY"/>
                </View>
               

                <View style={{ flex: 1 }}>
                <TouchableOpacity style={{flex:1}}>
       <View style={styles.boxView}>
       <View style={styles.boxInnerView}>

          </View>
         
         
         
              <View style={{flexDirection:"row"}}>
          <Text style={styles.boxTextTag}>Today Cash Sale </Text>
          <Text style={styles.boxText}>{rounder(item.today_cash_sale,decimal)}</Text>
          </View>
              <View style={{flexDirection:"row"}}>
          <Text style={styles.boxTextTag}>Today Credit Sale </Text>
          <Text style={styles.boxText}>{rounder(item.today_credit_sale,decimal)}</Text>
          </View>
              <View style={{flexDirection:"row"}}>
          <Text style={styles.boxTextTag}>Today Total Sale </Text>
          <Text style={styles.boxText}>{rounder(item.today_total_sale,decimal)}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
          <Text style={styles.boxTextTag}>Total No of bills</Text>
          <Text style={styles.boxText}>{item.today_total_bills}</Text>
          </View>
         
          <View style={{backgroundColor:"#000",height:.1}}/>
         
          </View>

       </TouchableOpacity>
                    {/* <TouchableOpacity style={{}} >
                        <View style={styles.boxView}>
                            
                            <Text style={styles.boxText}>Today Sales Report</Text>
                            <Text style={styles.boxText}>Today Cash Sale : {item.today_cash_sale}</Text>
            <Text style={styles.boxText}>Today Credit Sale : {item.today_cash_sale}</Text>
            <Text style={styles.boxText}>Today Total Sale :  {item.today_cash_sale}</Text>
                            </View>
                           
                    </TouchableOpacity> */}

                    

                </View>
                <View>
                    <Text style={styles.footerText}>Powerd by</Text>
                    <Text style={styles.footerText}>DQ Technologies</Text>


                </View>
            </View>
        </SafeAreaView>

  );
}

const styles = StyleSheet.create({


    button: {
      backgroundColor: "#000000",
      alignItems: "center",
      padding: 10,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20
  
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
      color:"#000",
      padding: 5,flex:1,
      textAlign: "left",
      fontWeight: 'bold'
  
  
  
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
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      justifyContent: 'flex-start',
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

export default TodaySales