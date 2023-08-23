import { View, Text, Alert, StyleSheet,ScrollView ,Image, TouchableOpacity,SafeAreaView} from 'react-native'
import React from 'react'
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import GoogleButton from '../Components/GoogleButton';
import Input from '../Components/Input'
import Button from '../Components/Button';
import { Screen } from 'react-native-screens';

const Login = ({navigation}) => {
  const InitialValues = {
    email : "",
    password : ""
  }

  async function Login(formValues){
    try {
    if (formValues.email === "" || formValues.password==="") {
      Alert.alert("WARN", "YOU CANNOT GIVE EMPTY VALUES")
      return
    }
    console.log("password: " , formValues.password, " email: ", formValues.email)
    await auth().signInWithEmailAndPassword(
      formValues.email,
      formValues.password,
    )   
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      Alert.alert("ERROR",'THIS USER WAS NOT FOUND')
    }

    if (error.code === 'auth/invalid-email') {
      Alert.alert("ERROR",'INVALID E-MAIL')
    }
    
    console.log(error);
    }

  }


  return (
    <ScrollView style={{flex:1, backgroundColor:"#292929"}}>
    <SafeAreaView style={styles.container}>
      <Image style={styles.Image} source={require("../Assest/pngwing.com.png")}></Image>
      <Formik initialValues={InitialValues} onSubmit={Login}>
      {({values, handleChange, handleSubmit}) => (  
        <>
        <Input value={values.email} onChangeText={handleChange("email")} description={"E - mail"}></Input>
        <Input value={values.password} onChangeText={handleChange("password")} isPassword={true} description={"Password"}></Input>
        <Button onPress={handleSubmit} description={"Log - In"}></Button>
        </>
        )}
      </Formik>
      <GoogleButton navigation={navigation} ></GoogleButton>
      <View style={styles.signUpButton}>
        <TouchableOpacity style={{alignSelf:"center", margin:15}} onPress={() => navigation.navigate("SignUp")}>
          <Text  style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
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
      fontSize:RFPercentage(2.2),
      alignSelf:"center"
    },
    Image:{
      width:RFPercentage(30),
      height:RFPercentage(30),
      resizeMode:"contain",
      alignSelf:"center",
      margin:RFPercentage(1),
      marginTop:RFPercentage(1.5)
    }
})