
import * as React from 'react';
import { View, StatusBar,Text ,Platform,SafeAreaView,StyleSheet,Button,TouchableOpacity,Image} from 'react-native';



const DataScreen =({navigation}) =>{
    const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
  return (
      
    <SafeAreaView style={{ flex: 1}}  forceInset={{top: 'never'}}>
       
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "orange" translucent = {true}/>
        
        <View style={{height:50,backgroundColor:"#E67E22",flexDirection:"row",justifyContent:"center",alignItems:"flex-start",alignItems:"center"}}>
            <TouchableOpacity onPress={()=>{navigation.navigate("Add Shop")}} style={{padding:4}}><Image source={require('./../../images/backarrow.png')}  style={{width:30, height:30}} />
            </TouchableOpacity><Text style={{flex:1,padding:8,fontSize:20,color:"#fff"}}>Cart Summary</Text></View>
        <View style={{margin:"2%"}}>
      <View style={{justifyContent:"space-between", backgroundColor: '#c2c7c4',flexDirection:"row",marginTop:"2%"}}>
      <Text style={{padding:15 ,fontSize:20}}>Product name</Text>
      <Text style={{padding:15,fontSize:20}}>Rate</Text>

      </View>
      <View style={{justifyContent:"space-between",flexDirection:"row",marginTop:"2%"}}>
      <Text style={{padding:15 ,fontSize:20}}>Product name</Text>
      <Text style={{padding:15,fontSize:20}}>130000.00</Text>

      </View>
      <View style={{flexDirection:"row",marginTop:"2%"}}>
      <Text style={{padding:15 ,fontSize:15,flex:1}}>product is for creating report of sales happened</Text>
      <Text style={{padding:15,fontSize:20,flex:1}}></Text>

      </View>
      <View style={{backgroundColor:'#c2c7c4',height:1}}/>
      <View style={{flexDirection:"row",marginTop:"2%"}}>
      <Text style={{padding:5 ,fontSize:18,flex:3,textAlign:"right",fontWeight:"bold"}}>Total :</Text>
      <Text style={{padding:5,fontSize:18,flex:1,fontWeight:"bold"}}>12345.00</Text>

      </View>
      <View style={{flexDirection:"row",marginTop:"2%"}}>
      <Text style={{padding:5 ,fontSize:18,flex:3,textAlign:"right",fontWeight:"bold"}}>Deduction:</Text>
      <Text style={{padding:5,fontSize:18,flex:1,fontWeight:"bold"}}>12345.00</Text>

      </View>
      <View style={{flexDirection:"row",marginTop:"2%"}}>
      <Text style={{padding:5 ,fontSize:18,flex:3,textAlign:"right",fontWeight:"bold"}}>Grand Total :</Text>
      <Text style={{padding:5,fontSize:18,flex:1,fontWeight:"bold"}}>12345.00</Text>

      </View>
      <Text style={{padding:5,fontSize:18,fontWeight:"bold",marginTop:"4%"}}>PAYMENT METHODS</Text>
    
<View style={styles.container}>
     <TouchableOpacity style={styles.buttonContainer}>
     <Image source={require('./../../images/key.png')}  style={{width:40, height:40,borderRadius:30}} />
     <Text style={{textAlign:"center",color:"#fff",padding:5,fontSize:20}}>Dealer Key</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonContainer}>
    <Image source={require('./../../images/rupee.png')}  style={{width:40,marginTop:5,height:35,borderRadius:30}} />
    <Text style={{textAlign:"center",color:"#fff",padding:5,fontSize:20}}>Pay Onlline</Text>
    </TouchableOpacity>
  </View>
  </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
     
    },
    buttonContainer: {height:70,borderRadius:10,
      flex: 1,margin:'1%',justifyContent:"center",alignItems:"center",
      backgroundColor:"#E67E22"
    }
  });
export default DataScreen