import { StyleSheet, Text, View, Alert,Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

GoogleSignin.configure({
    webClientId: '512190792821-c1pesc33vpucm1m1dqo0v2pljs3mttb2.apps.googleusercontent.com',
  });

signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };
 const GoogleButton = ({navigation}) => {
   
    async function signIn()  {
       try {await onGoogleButtonPress()
        console.log("successfull")

        database()
        .ref(`/${auth().currentUser.email.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')}`)
        .once("value", snapshot => {
            if (snapshot.exists()) {
                console.log("Kullanıcı daha önce kayıtlı.");
              } else {
                console.log("Kullanıcı daha önce kayıtlı değil.");
                database()
                .ref(`/${auth().currentUser.email.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')}`)
                .set(
                  {
                    favorites:["id"]
                  }
                )
                Alert.alert(" WELCOME ","Welcome to Recipes World")

              }
        })} catch (error) {
          console.log(error)
        }
    }

  return (
    <TouchableOpacity onPress={signIn} style={styles.container}>
        <Image style={styles.Image}source={require("../Assest/google.png")}></Image>
        <Text style={styles.ButtonText}>Use Google Account</Text>
    </TouchableOpacity>
  )
}



async function onGoogleButtonPress() {
    try
    {// Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential

    return auth().signInWithCredential(googleCredential);
    } catch (error) {
        console.log(error)
    }
}


export default GoogleButton

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:"white",
        margin:RFPercentage(1.5),
        marginHorizontal:RFPercentage(2),
        borderRadius:10,
        alignItems:"center",
        borderColor:"black",
        borderWidth:2,
        paddingVertical:5
    },
    Image:{
        width:RFPercentage(3),
        height:RFPercentage(3),
        margin:5,
        marginLeft:15,
        marginRight:0
    },
    ButtonText:{
        flex:1,
        color:"black",
        textAlignVertical:"center",
        flex:1,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:RFPercentage(2.5),
    }
})