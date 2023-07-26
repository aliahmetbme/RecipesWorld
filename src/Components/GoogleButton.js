import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
// import { GoogleSignin } from '@react-native-google-signin/google-signin'
// import auth from "@react-native-firebase/auth"
// import database from "@react-native-firebase/database"

// GoogleSignin.configure({
//     webClientId: '',
//   });

// signOut = async () => {
//     try {
//       await GoogleSignin.signOut();
//     } catch (error) {
//       console.error(error);
//     }
//   };
 const GoogleButton = ({navigation}) => {
   
//     async function signIn()  {
//         await onGoogleButtonPress()

//         database()
//         .ref(`/${auth().currentUser.email.split("@")[0] + auth().currentUser.email.split("@")[1].split(".")[0]}`)
//         .once("value", snapshot => {
//             if (snapshot.exists()) {
//                 console.log("Kullanıcı daha önce kayıtlı.");
//                // navigation.navigate("")
//               } else {
//                 console.log("Kullanıcı daha önce kayıtlı değil.");
//                // navigation.navigate("")
//               }
//         })
//     }

  return (
    <TouchableOpacity style={styles.container}>
        <Image style={styles.Image}source={require("../Assest/google.png")}></Image>
        <Text style={styles.ButtonText}>Use Google Account</Text>
    </TouchableOpacity>
  )
}



// async function onGoogleButtonPress() {
//     try
//     {// Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     // Get the users ID token
//     const { idToken } = await GoogleSignin.signIn();
  
//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//     // Sign-in the user with the credential

//     return auth().signInWithCredential(googleCredential);
//     } catch (error) {
//         console.log(error)
//     }
// }


export default GoogleButton

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:"white",
        margin: 10,
        marginHorizontal:15,
        borderRadius:10,
        alignItems:"center",
        borderColor:"black",
        borderWidth:2,
        paddingVertical:5
    },
    Image:{
        width:30,
        height:30,
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
        fontSize:17,
    }
})