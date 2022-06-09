
import React from 'react';
import { View,  Text,  StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
    const navigation = useNavigation();
   return (
    <View style={{ flexDirection: "row" }} >
        <TouchableOpacity style={{width:60}}onPress={() => navigation.navigate(props.name)}>
          <Image source={require('./../images/back_round.png')} style={{ width: 38, height: 38 ,resizeMode:"contain"}}></Image>
        </TouchableOpacity>
        <View style={{justifyContent:'center',alignItems:"center"}}><Text style={{textAlign:"center",marginLeft:20, color: "#000", fontSize: 15, fontWeight: "500" }}>{props.screenName}</Text></View>
      </View>
 );
};

export default Header;

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
