import NetInfo from "@react-native-community/netinfo"; 
import { Platform, StyleSheet } from 'react-native';
const secret_key ="7852616a464461644d56524b537247543767474f50773d3d"
const ab ="6d316842584831724f4367342b7766593541527335485530476f564e6353506e4a747834467772786d626f3d";
const deviceType = Platform.OS === 'ios' ?2:3
const base_url = Platform.OS === 'ios' ?"https://report.dqtech.in/api/":"http://report.dqtech.in/api/"
export const getToken =(deviceId)=>{
    const data = new FormData();
data.append('secret_key', secret_key);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('push_token', 3);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data',
        Accept: "application/json" },
        body: data
    };
    
     return fetch('http://report.dqtech.in/api/guestToken',requestOptions)
    .then((response) => response.json())
    .then((json) => {
       
      return(json)
    })
    .catch((error) => {
     
      console.error(error);
    });
    
}
export const getLicense =(token,license,deviceId,appId,dname)=>{
    const data = new FormData();
data.append('app_id',appId);
data.append('device_type',deviceType);
data.append('device_id', deviceId);
data.append('licence_key', "767a7547433157523061726f44697146496e656151642b6a366d726a3155616350306778786e35474751493d");
data.append('device_name', dname);
console.log("req",data,token)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    },
        body: data
    };
  
    return fetch('http://report.dqtech.in/api/licenceRegister',requestOptions)
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([res, data]) => {
      console.log(res, data);
      return({"response":data,"status":res})
    })
    .catch(error => {
      console.error(error);
      return { name: "network error", description: "" };
    });
    
  }
    

export const loginRequest =(clientToken,token,username,password,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('username', username);
data.append('password', password);

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' ,
      'Authorization': 'Bearer ' + token
  },
      body: data
  };
 
  return fetch('http://report.dqtech.in/api/userLogin',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
  
}
export const stockReport =(clientToken,token,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
console.log("datta",data,token)

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'multipart/form-data'  ,
 
  'Authorization': `Bearer ${token}`
},
      body: data
  };

  return fetch('http://report.dqtech.in/api/stockReport',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.stock_report,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
  
}
export const salesReport =(clientToken,token,date,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('type', date);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
  },
      body: data
  };
  
  
  return fetch('http://report.dqtech.in/api/salesReport',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data.stock_report,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}

export const getBankOrCashBook =(clientToken,token,param,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
if (param === "Bank Book")
{
data.append('type', "bank");
}
else{
  data.append('type', "cash");
}


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
  
        'Authorization': `Bearer ${token}`},
      body: data
  };
  
  return fetch('http://report.dqtech.in/api/ledgerReport',requestOptions)
  .then(response => response.json())
  .then(json=> {
    
    return(json)
  })
  .catch((error) => {
    console.error(error);
  });
  
}
export const getBankList =(clientToken,token,param,deviceId)=>{
  const data = new FormData();
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);

if (param === "Bank Book")
{
data.append('type', "bank");
}
else{
  data.append('type', "cash");
}


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
  
        'Authorization': `Bearer ${token}`},
      body: data
  };
 
  return fetch('http://report.dqtech.in/api/ledgers',requestOptions)
  .then(response => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]);
  })
  .then(([res, data]) => {
    console.log(res, data);
    return({"response":data,"status":res})
  })
  .catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
  
}
export const getDetails =(clientToken,token,param,deviceId,code,isEnabled)=>{
  const data = new FormData();
 
data.append('client_token', clientToken);
data.append('device_type', deviceType);
data.append('device_id', deviceId);
data.append('code', code);
data.append('day',"A");
data.append('grouped',isEnabled?"1":"0");
data.append('filter_dc',"1");


if (param === "Bank Book")
{
data.append('type', "bank");
}
else{
  data.append('type', "cash");
}


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
  
        'Authorization': `Bearer ${token}`},
      body: data
  };
 
  return fetch('http://report.dqtech.in/api/ledgerReport',requestOptions)
  .then(response => response.json())
  .then(json=> {
      console.log("resp",json)
    return(json)
  })
  .catch((error) => {
    console.error(error);
  });
  
}
export const getUser =(token,deviceId)=>{
  const data = new FormData();

data.append('device_type', deviceType);
data.append('device_id', deviceId);


  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
  
        'Authorization': `Bearer ${token}`},
      body: data
  };
 
  return fetch('http://report.dqtech.in/api/switchUser',requestOptions)
  .then(response => response.json())
  .then(json=> {
      
    return(json)
  })
  .catch((error) => {
    console.error(error);
  });
  
}