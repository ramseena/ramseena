
import React, { useState,useEffect } from 'react';
import { View, StatusBar,Text ,FlatList,Platform,SafeAreaView,StyleSheet,Button,TouchableOpacity,Image} from 'react-native';
//import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../common/Header';
import {rounder} from './../../common/helper'

const MonthlySales =({route,navigation}) =>{
    const { item } = route.params;
    const [decimal, setDecimal] = useState("");
    const getDecimal=async()=>
{
  const decimals = await AsyncStorage.getItem("decimals");
  setDecimal(decimals)
}
useEffect(()=>{
  getDecimal();
     
    },[route])
    
    const Item=({ item })=> {
      var d = new Date(item.date) 

var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() ;

        return (
            
          <View style={{ flex: 1 }}>
                         <TouchableOpacity style={{flex:1}}>
       <View style={styles.boxView}>
       <View style={styles.boxInnerView}>

          </View>
         
         
          <View style={{flexDirection:"row"}}>
          <Text style={styles.boxTextTag}>DATE </Text>
          {/* <Text style={styles.boxTextTag1}>{moment(item.date, "YYYY-MM-DD").format("DD-MM-YYYY") } </Text> */}
            <Text style={styles.boxTextTag1}>{datestring} </Text> 
          
          </View>
              <View style={{flexDirection:"row"}}>
              <Text style={styles.boxTextTag}>TOTAL</Text>
              <Text style={styles.boxTextTag1}>{rounder(item.nettotal,decimal)} </Text>
          </View>
          <View style={{flexDirection:"row"}}>
          <Text style={styles.boxTextTag}>TOTAL BILLS </Text>
          <Text style={styles.boxTextTag1}>{item.total_bills} </Text>
          </View>
            
         
          
         
          </View>

       </TouchableOpacity>

                    

                </View>
          
        );
      }
  return (
      
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4',marginTop:StatusBar.currentHeight }}>
            <View style={{flex:1}}>
                <View style={{ backgroundColor: '#f1f2f4' ,alignItems:"flex-start",margin:20}}>

                <Header name ="Sales Report" screenName="DAILY SALES SUMMARY"/>


                </View>
             
            <FlatList
        numColumns={1}
        data={item}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => <Item item={item}/>}
        
      />
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
      padding: 5,flex:1,
      textAlign: "left",
      fontWeight: 'bold',color:"#000"
  
  
  
    },
    boxTextTag1: {
      color: "#008000",
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

export default MonthlySales