
import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../components/context';
import { View, StatusBar,ActivityIndicator, Text, Platform, SafeAreaView, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { salesReport } from '../../request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodaySales from './TodaySales';
import Header from '../../common/Header';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

const SalesScreen = ({ navigation }) => {
    const [salesDataMonth, setSalesDataMonth] = useState("");
    const [salesDataYear, setSalesDataYear] = useState("");
    const [salesDataToday, setSalesDataToday] = useState("");
    let deviceId = DeviceInfo.getUniqueId()
    const { signOut } = React.useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const showToast = (msg) => {
        Toast.show(msg, Toast.SHORT, [
            'UIAlertController',
        ]);
    }
    const getSalesReportForMonth = async (date) => {
       
        const token = await AsyncStorage.getItem("token");
        const clienttoken = await AsyncStorage.getItem("clienttoken");

        const network = await NetInfo.fetch();
        if (network.isConnected) {
            setLoading(true)
            const salesData = await salesReport(clienttoken, token, date, deviceId)

            if (salesData.status === 200) {
                setSalesDataMonth(salesData.response)
                setLoading(false)
                navigation.navigate("Monthly Report", {
                    screen: 'Monthly',
                    params: { item: salesData.response}
                })
            }
            else if (salesData.status === 303) {
                alert("license expired")
                setLoading(false)
                signOut()
            }
            else {
                setLoading(false)
                showToast("no data available")
            }
        }
        else {
            
            showToast("please check your network connection")
        }
    }
    const getSalesReportForYear = async (date) => {
        
        const token = await AsyncStorage.getItem("token");
        const clienttoken = await AsyncStorage.getItem("clienttoken");
        const network = await NetInfo.fetch();
        if (network.isConnected) {
            setLoading(true)
            const salesData = await salesReport(clienttoken, token, date, deviceId)
            if (salesData.status === 200) {
                setSalesDataYear(salesData.response)
                setLoading(false)

                navigation.navigate("Yearly Report", {
                    screen: 'Year',
                    params: { item: salesData.response }
                })
            }
            else if (salesData.status === 303) {
                setLoading(false)
                signOut()
            }
            else {
                alert("license expired")
                setLoading(false)
                showToast("no data available")
            }
        }
        else {
            
            showToast("please check your network connection")
        }

    }
    const getSalesReportForToday = async (date) => {
      
        const token = await AsyncStorage.getItem("token");
        const clienttoken = await AsyncStorage.getItem("clienttoken");
        const network = await NetInfo.fetch();
        if (network.isConnected) {
            setLoading(true)
            const salesData = await salesReport(clienttoken, token, date, deviceId)
            console.log("saleee",salesData)
            if (salesData.status === 200) {
                setSalesDataToday(salesData.response)
                setLoading(false)
                navigation.navigate("Daily Report", {
                    screen: 'today',
                    params: { item: salesData.response }
                })
            }
            else if (salesData.status === 303) {
                setLoading(false)
                alert("license expired")
                signOut()
            }
            else {
                setLoading(false)
                showToast("no data available")
            }
        }
        else {
            
            showToast("please check your network connection")
        }
    }
    const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
    
          </View>
        );
      }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4', marginTop: StatusBar.currentHeight }}>
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#f1f2f4', alignItems: "flex-start", margin: 20 }}>

                    <Header name="Add Shop" screenName="Sales Report" />


                </View>


                <View style={{ flex: 3 }}>
                    <TouchableOpacity style={{}} onPress={() => {
                        getSalesReportForToday("today")
                    }}>
                        <View style={styles.boxView}>
                            <View style={styles.boxInnerView}>
                                <Image source={require('./../../images/today.png')} style={styles.boxImage}></Image>
                            </View>
                            <Text style={styles.boxText}>Today Sales Summary</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => {
                        getSalesReportForMonth("month")
                    }}>
                        <View style={styles.boxView}>
                            <View style={styles.boxInnerView}>
                                <Image source={require('./../../images/yearly.png')} style={styles.boxImage}></Image>
                            </View>
                            <Text style={styles.boxText}>Day Wise Sales Summary</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => {
                        getSalesReportForYear("year")
                    }}>
                        <View style={styles.boxView}>
                            <View style={styles.boxInnerView}>
                                <Image source={require('./../../images/monthly.png')} style={styles.boxImage}></Image>
                            </View>
                            <Text style={styles.boxText}>Monthly Sales Summary</Text></View>
                    </TouchableOpacity>






                </View>
                <View>
                    <Text style={styles.footerText}>Powerd by</Text>
                    <Text style={styles.footerText}>DQ Technologies</Text>


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

        padding: 5,
        textAlign: "center",
        fontWeight: 'bold',color:"#000"



    },
    lottie: {
        width: 100,
        height: 100,
    },

    boxView: {
        height: 150,
        borderRadius: 10,

        backgroundColor: '#ffffff',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
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
        color: '#fff',
        fontSize: 15,
        textAlign: 'center'
    },




});


export default SalesScreen