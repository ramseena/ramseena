
import React, { useState, useEffect } from 'react';
//import moment from 'moment';
import { View, StatusBar, Text, FlatList, Platform, SafeAreaView, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import Header from '../../common/Header';
import {rounder} from './../../common/helper'

const YearlySales = ({ route, navigation }) => {

  // const NewDate= moment("21/10/14", "DD/MM/YY").format("MM-DD-YY") 

    const data1 = route.params.item
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
            "name": "CASH BOOK",
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
    const Item = ({ item }) => {
        return (

            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ flex: 1 }}>
                    <View style={styles.boxView}>
                        <View style={styles.boxInnerView}>

                        </View>


                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.boxTextTag}>MONTH </Text>
                            <Text style={styles.boxTextTag1}>{item.date} </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.boxTextTag}>TOTAL</Text>
                            <Text style={styles.boxTextTag1}>{rounder(item.nettotal)} </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.boxTextTag}>TOTAL BILLS </Text>
                            <Text style={styles.boxTextTag1}>{item.total_bills} </Text>
                        </View>




                    </View>

                </TouchableOpacity>



            </View>
        );
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4', marginTop: StatusBar.currentHeight }}>
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#f1f2f4', alignItems: "flex-start", margin: 20 }}>
                    <Header name="Sales Report" screenName="MONTHLY SALES SUMMARY" />
                </View>

                <FlatList
                    numColumns={1}
                    data={data1}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => <Item item={item} />}

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
        padding: 5, flex: 1,
        textAlign: "left",
        fontWeight: 'bold'



    },
    boxTextTag1: {
        color: "#008000",
        padding: 5, flex: 1,
        textAlign: "left",
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
        color: '#fff',
        fontSize: 15,
        textAlign: 'center'
    },




});
export default YearlySales