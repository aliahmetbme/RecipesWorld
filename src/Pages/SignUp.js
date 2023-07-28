import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import {Formik} from "formik"
import auth from  "@react-native-firebase/auth"
import database from "@react-native-firebase/database"

import Input from '../Components/Input'
import Button from '../Components/Button';

const SignUp = ({navigation}) => {
  const InitialValues = {
    email : "",
    password: "",
    repassword: "",
  }

  async function singUp(formValues){
    try {
      if (formValues.email === "" || formValues.password==="" || formValues.repassword==="") {
        Alert.alert("WARN", "YOU CANNOT GIVE EMPTY VALUES")
        return
      }

      if (formValues.password !== formValues.repassword){
        Alert.alert("WARN", "THE PASSWORDS ARE NOT SAME")
        return
      }
      console.log("password: " , formValues.password, " email: ", formValues.email)
      await auth().createUserWithEmailAndPassword(
        formValues.email,
        formValues.password,
      )
      database()
        .ref(`/${auth().currentUser.email.split("@")[0] + auth().currentUser.email.split("@")[1].split(".")[0]}`)
        .set(
          {
            favorites:["id"]
          }
        )

      navigation.navigate("Categories")
      Alert.alert(" WELCOME ","Welcome to Recipes World")
    } catch (error) { 
      if (error.code === 'auth/invalid-email') {
        Alert.alert("WARN", "YOUR E-MAIL FORMAT IS INVALID")
      }
      console.log(error);
      }
  }


  return (
    <View style={styles.container}>
      <View style={styles.title_container}> 
        <Text style={styles.title}>REGISTRATION PAGE</Text>
      </View>
      <View style={{flex:0.8}}>
        <Formik initialValues={InitialValues} onSubmit={singUp}>
          {({values, handleChange, handleSubmit}) =>(
            <>
              <Input value={values.email} onChangeText={handleChange("email")} description={"Enter e - mail"}></Input>
              <Input value={values.password} onChangeText={handleChange("password")} isPassword={true} description={"Enter Password"}></Input>
              <Input value={values.repassword} onChangeText={handleChange("repassword")} isPassword={true} description={"Enter Password Again"}></Input>
              <Button onPress={handleSubmit} description={"Sign - Up"}></Button>
            </>
          )}
        </Formik>
      </View>  
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#292929",
    flex:1,
    justifyContent:"center"
  },
  title:{
    color:"white",
    alignSelf:"center",
    fontSize:26,
    fontWeight:"bold"
  },
  title_container:{
    flex:0.2,
    justifyContent:"center",
  }
})