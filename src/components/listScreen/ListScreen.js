
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, FlatList, ActivityIndicator, Platform, SafeAreaView, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBankList, getDetails } from './../../request'
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import DropDownPicker from 'react-native-dropdown-picker';

const ListScreen = ({ route, navigation }) => {
   
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    ]);
    const showToast = (msg) => {
        Toast.show(msg, Toast.SHORT, [
            'UIAlertController',
        ]);
    }
  

    const submit = async () => {
        if(value)
        {
            const selectedItem = items.find((item)=>item.value===value)
            
        
        if (route.params.type === "Bank Book") {
            navigation.navigate("BankBook", { value: value,item:selectedItem.label});
        }
        else {
          
            navigation.navigate("Cashes", { value: value,item:items });
        }
    }
    else{
        showToast("please select a value to continue")
    }
     }
     React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setItems(route.params.data) 
        });
      
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [route]);
    




    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f2f4', justifyContent: "center", alignContent: "center", marginTop: StatusBar.currentHeight }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="orange" translucent={true} />
            <View style={{ backgroundColor: '#f1f2f4', alignItems: "flex-start" ,margin:15}}>
       
            <Header name ="Add Shop" screenName="Cash/Bank"/>
</View>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "center" }}>

                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        containerStyle={{
                            marginLeft: '10%', marginRight: 10, width: 300
                        }}
                        zIndex={1000}
                        defaultIndex={1}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                    
                    <TouchableOpacity
                        style={{backgroundColor:"#f47822", marginLeft: '10%', marginRight: 10,borderRadius:5, width: 300,marginTop:20,padding:15,justifyContent:"center"}}
                        onPress={submit}
                    >
                        <Text style={{ color: "#FFFFFF" ,textAlign:'center',fontWeight:"bold"}}>GET DETAILS</Text>

                    </TouchableOpacity>
                </View>
               
            </ScrollView>

        </SafeAreaView>

    );
};

export default ListScreen;

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

    button: {

        backgroundColor: "#f47822",
        alignItems: "center",
        padding: 15,
        marginLeft: 40,
        marginRight: 50,
        marginTop: 60,
        borderRadius: 10

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
    }




});
