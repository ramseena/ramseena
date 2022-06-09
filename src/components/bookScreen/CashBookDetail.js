
import React, { useState, useEffect } from 'react';
import { View, StatusBar, Switch, Text, FlatList, Platform, SafeAreaView, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import Header from '../../common/Header';
import { rounder } from './../../common/helper'

const CashBookDetail = ({ route, navigation }) => {
  const [data, setData] = useState("")

  console.log(route.params.data.all)



  let a = 0;
  useEffect(() => {

    setData(route.params.data.all)
  }, [route])

  const changeDataAll = () => {

    setData(route.params.data.all)
  }
  const changeDataDebit = () => {

    setData(route.params.data.debit)
  }
  const changeDataCredit = () => {

    setData(route.params.data.credit)
  }


  const Item = ({ item, index }) => {
    index = index + 1;
    return (
      <View style={{ flexDirection: "row", backgroundColor: "#fff", justifyContent: "center", alignItems: "center", padding: 5, margin: 1 }}>
       
        <View style={{ flexDirection: "row", flex: 2, flexWrap: "wrap" }}>
          <View style={{flexDirection:"row"}}>
          <Text style={styles.boxText}>{index}.</Text>
          <Text style={[styles.boxText, { textAlign: "left" }]}>{item.particulars}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
          <Text style={styles.boxText}></Text>
          <Text style={[styles.boxText, { textAlign: "left", color: "grey" }]}>{item.narration}</Text>
          </View>
        </View>
        <View style={[styles.headerText]}>

          <Text style={[styles.boxText, { color: "green", fontWeight: "bold", alignSelf: "flex-end" }]}>{rounder(item.debit)}</Text>
        </View>
        <View style={[styles.headerText]}>

          <Text style={[styles.boxText, { color: "red", fontWeight: "bold", alignSelf: "flex-end" }]}>{rounder(item.credit)}</Text>
        </View>

      </View>)
  }


  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4', marginTop: StatusBar.currentHeight }}>

      <StatusBar barStyle="light-content" hidden={false} backgroundColor="orange" translucent={true} />
      <View style={{ backgroundColor: '#f1f2f4', margin: 10, flex: 1 }}>
        <View style={{ flexDirection: "row" }} >
          <TouchableOpacity style={{ width: 60 }} onPress={() => navigation.navigate("Cashes", { value: route.params.code, itemName: route.params.itemName })}>
            <Image source={require('./../../images/back_round.png')} style={{ width: 38, height: 38, resizeMode: "contain" }}></Image>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: "center" }}><Text style={{ textAlign: "center", marginLeft: 20, color: "#000", fontSize: 15, fontWeight: "500" }}>{"Cash Book Details"}</Text></View>
        </View>

        <View style={{ flexDirection: "row", borderRadius: 2, marginTop: 15 }}>
          <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.boxText, { fontWeight: "bold" }]}>{"DATE"}</Text>
            <Text style={styles.boxText}>{route.params.date}</Text>
            <Text style={[styles.boxText, { fontWeight: "bold" }]}>{route.params.name}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.boxText, { color: "green", fontWeight: "bold" }]}>{"DEBIT"}</Text>
            <Text style={[styles.boxText, { color: "green" }]}>{rounder(route.params.totdebit)}</Text>
          </View>
          <View style={[styles.headerText, { backgroundColor: "#fff5f6", padding: 1 }]}>
            <Text style={[styles.boxText, { color: "red", fontWeight: "bold" }]}>{"CREDIT"}</Text>
            <Text style={[styles.boxText, { color: "red" }]}>{rounder(route.params.totcredit)}</Text>
          </View>

        </View>

        <FlatList
          numColumns={1}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          data={data}
          renderItem={({ item, index }) => <Item item={item} index={index} />}

        />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={changeDataDebit} style={{ flex: 1, padding: 15, borderRadius: 5, backgroundColor: "green", margin: 4, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#FFF" }}>DEBIT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={changeDataCredit} style={{ flex: 1, padding: 15, borderRadius: 5, backgroundColor: "red", margin: 4, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#FFF" }}>CREDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={changeDataAll} style={{ flex: 1, padding: 15, borderRadius: 5, backgroundColor: "#f47822", margin: 4, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#FFF" }}>All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>

  );
};

export default CashBookDetail

const styles = StyleSheet.create({


  button: {
    backgroundColor: "#000000",
    alignItems: "center",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20

  },
  tableHeader: { flex: 1, borderColor: "#000039", borderWidth: 1, backgroundColor: "#fff", padding: 10, borderTopWidth: 2 },
  tableHeaderPart: { flex: 2, borderColor: "#000039", borderWidth: 1, backgroundColor: "#fff", padding: 10, borderTopWidth: 2 },
  tableHeaderlist: { flex: 1, borderColor: "#000039", backgroundColor: "#fff", padding: 10 },
  tableHeaderlisttwo: { flex: 1, borderColor: "#000039", backgroundColor: "#fff", padding: 10 },
  tableHeaderlisttwoPart: { flex: 2, borderColor: "#000039", backgroundColor: "#fff", padding: 10 },
  tableHeaderlast: { flex: 1, backgroundColor: "#fff", padding: 10, borderBottomWidth: 1, borderLeftWidth: 1 },
  tableHeaderlastPart: { flex: 2, backgroundColor: "#fff", padding: 10, borderBottomWidth: 1 },


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
  lottie: {
    width: 100,
    height: 100,
  },
  boxTextData: { color: "#000", textAlign: "center", marginTop: 6, padding: 2, fontWeight: "bold" },
  boxText: {
    color: "#000",
    padding: 5,
    textAlign: "center", alignContent: "center", fontSize: 12



  },
  boxTextTag: {
    padding: 5, flex: 1,
    textAlign: "left",
    fontWeight: 'bold',color:"#000"
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
    justifyContent: 'flex-start', flexDirection: "row"
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


  headerText: {
    flex: 1, justifyContent: "center", alignItems: "center", padding: 4,color:"#000"
  }

});