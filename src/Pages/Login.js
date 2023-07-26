import { View, Text, Alert, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {Formik} from 'formik';

import GoogleButton from '../Components/GoogleButton';
import Input from '../Components/Input'
import Button from '../Components/Button';

const Login = () => {
  const InitialValues = {
    email : "",
    password : ""
  }

  function Login(formValues){
    if (formValues.email === "" || formValues.password==="") {
      Alert.alert("WARN", "YOU CANNOT GIVE EMPTY VALUES")
      return
    }
    console.log("password: " , formValues.password, " email: ", formValues.email)
  }


  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={require("../Assest/pngwing.com.png")}></Image>
      <Formik initialValues={InitialValues} onSubmit={Login}>
      {({values, handleChange, handleSubmit}) => (  
        <>
        <Input value={values.email} onChangeText={handleChange("email")} description={"E - mail"}></Input>
        <Input value={values.password} onChangeText={handleChange("password")} isPassword={true} description={"Password"}></Input>
        <Button onPress={handleSubmit}></Button>
        </>
        )}
      </Formik>
      <GoogleButton></GoogleButton>
      <View style={styles.signUpButton}>
        <TouchableOpacity style={{alignSelf:"center", margin:15}} onPress={() => console.log("ali")}>
          <Text  style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
      backgroundColor:"#292929",
      flex:1,
      justifyContent:"center"
    },
    signUpButton:{
      justifyContent:"flex-end",
      flex:1,
    },
    signUpText:{
      color:"white",
      fontSize:18,
      alignSelf:"center"
    },
    Image:{
      width:250,
      height:250,
      resizeMode:"contain",
      alignSelf:"center",
      margin:10,
      marginTop:15
    }
})