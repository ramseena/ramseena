import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../components/context';
import { Platform, StyleSheet, SafeAreaView, StatusBar, Text, View, FlatList, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

import { stockReport, getBankList } from '../../request';

const HomeScreen = ({ navigation, route }) => {
  const deviceType = Platform.OS === 'ios' ? 2 : 3
  const [shopName, setShopName] = useState("");
  const [userName, setUserName] = useState("");
  const data = [
    {
      "id": 1,
      "name": "SALES REPORTS",
      "email": "miyah.myles@gmail.com",
      "position": "Data Entry Clerk",
      "photo": require('./../../images/report.png')
    },
    {
      "id": 2,
      "name": "CASH BOOKss",
      "email": "june.cha@gmail.com",
      "position": "Sales Manager",
      "photo": require('./../../images/cashbook.png')
    },
    {
      "id": 3,
      "name": "BANK BOOK",
      "email": "iida.niskanen@gmail.com",
      "position": "Sales Manager",
      "photo": require('./../../images/money.png')
    },

    {
      "id": 4,
      "name": "STOCK VALUE",
      "email": "jonathan.nu\u00f1ez@gmail.com",
      "position": "Clerical",
      "photo": require('./../../images/stock.png')
    }


  ]
  const showToast = (msg) => {
    Toast.show(msg, Toast.SHORT, [
      'UIAlertController',
    ]);
  };
  const { signOut } = React.useContext(AuthContext);
  const getList = async (type) => {

    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");
    const network = await NetInfo.fetch();
    if (network.isConnected) {

      const list = await getBankList(clienttoken, token, type, deviceId)
console.log("lisstt",list)

      if (list.status === 200) {
        if (type === "Bank Book") {
          const banklist = list.response.bank_books.map(item => ({ "value": item.code, "label": item.name }));

          navigation.navigate('List', { data: banklist, type: type })
        }
        else {
          const cashlist = list.response.cash_books.map(item => ({ "value": item.code, "label": item.name }));

          navigation.navigate('List', { data: cashlist, type: type })

        }

      }
      else if(list.status === 303)
      {alert("license expired")

        signOut()
      }
      else{
        showToast("no data available")
      }

    }
    else {
  
      showToast("please check your network connection")
    }


  }
  getStockReport = async () => {

    let deviceId = await DeviceInfo.getUniqueId()
    const token = await AsyncStorage.getItem("token");
    const clienttoken = await AsyncStorage.getItem("clienttoken");

    const network = await NetInfo.fetch();

    if (network.isConnected) {

      const stockData = await stockReport(clienttoken, token, deviceId)
     
      if (stockData.status === 200) {

        navigation.navigate('StockReport', { data: stockData.response })
      }
      else if (stockData.status === 303) { signOut() }
      else {
        showToast("no data found")
      }

    }
    else {

      showToast("please check your network connection")
    }

  }


  const getShop = async () => {

    const shopName = await AsyncStorage.getItem("shopName");
    const userName = await AsyncStorage.getItem("userName");
    setShopName(shopName)
    setUserName(userName)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getShop()
    });
    return unsubscribe;
  }, [route]);
  const showConfirmDialog = async () => {

    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to logout?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {

            signOut("");
          },
        },

        {
          text: "No",
        },
      ]
    );
  };




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f47822' }}>
      <View style={{ flex: 1, backgroundColor: '#f8f8ff' }}>

        <View style={{ paddingRight: 30, paddingLeft: 15, backgroundColor: '#f47822', flexDirection: "row", paddingTop: deviceType === 2 ? "1%" : "7%" }} >
          <TouchableOpacity onPress={() => navigation.openDrawer()}><Image source={require('../../images/hamburger.png')} style={{ width: 60, height: 60, resizeMode: "contain" }}></Image></TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={showConfirmDialog}><Image source={require('../../images/power-off.png')} style={styles.logout}></Image></TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: '#f47822', marginTop: -0, alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
          <Text style={styles.titleText}>Hi {userName}!</Text>
          <Text style={{ fontStyle: "normal", fontSize: 15, color: "#fff", textAlign: "center", padding: 5 }}>{shopName}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: -100 }}>


          <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Sales Report')}>
            <View style={styles.boxView}>
              <View style={styles.boxInnerView}>
                <Image source={require('../../images/salesreport.png')} style={styles.boxImage}></Image>
              </View>
              <Text style={styles.boxText}>Sales Report</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }} onPress={() => getStockReport()}>
            <View style={styles.boxView}>
              <View style={styles.boxInnerView}>
                <Image source={require('../../images/stockreport.png')} style={styles.boxImage}></Image>
              </View>
              <Text style={styles.boxText}>Stock Report</Text></View>
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>


          <TouchableOpacity style={{ flex: 1 }} onPress={() => getList("Cash Book")}>
            <View style={styles.boxView}>
              <View style={styles.boxInnerView}>
                <Image source={require('../../images/cashbooks.png')} style={styles.boxImage}></Image>
              </View>
              <Text style={styles.boxText}>Cash Book</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => getList("Bank Book")}>
            <View style={styles.boxView}>
              <View style={styles.boxInnerView}>
                <Image source={require('../../images/Bankbook.png')} style={styles.boxImage}></Image>
              </View>
              <Text style={styles.boxText}>Bank Book</Text></View>
          </TouchableOpacity>
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
    width: 55,
    height: 60, resizeMode: "contain"
  },
  logout: {
    marginTop: '80%',
    width: 25,
    height: 25
  },

  boxText: {
color:"#000",
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
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20
  },

  footerText: {
    color: '#000000',
    fontSize: 15,
    textAlign: 'center'
  },




});



export default HomeScreen;