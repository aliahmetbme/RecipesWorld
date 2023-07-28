import { StyleSheet, Text, View, FlatList , Dimensions, TouchableOpacity ,ScrollView,Image} from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import Icon from "react-native-vector-icons/Ionicons"
import Icons from "react-native-vector-icons/FontAwesome"
import {GoogleSignin} from "@react-native-google-signin/google-signin"
import Favorites from "./Favorites"

const Profile = ({navigation}) => {
    const [source] = React.useState(auth().currentUser.photoURL || "https://images.pexels.com/photos/5506141/pexels-photo-5506141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    const signOut = async () => {
        try {
          await auth().signOut();
          await GoogleSignin.signOut();
          console.log("çıkıldı")
        } catch (error) {
          console.error(error);
        }
    
        navigation.navigate("Login")
    
      };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.Imagecontainer}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Categories")}>
                        <Icon name="home" size={35} color="#898989" style={{margin:15}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={signOut}>
                        <Icons name="sign-out" size={35} color="#898989" style={{margin:15}} ></Icons>
                    </TouchableOpacity>
                </View>
                <Text style={styles.profile}>My Profile</Text>
                <Image style={styles.image} source={{uri: source}}></Image>
                <Text style={styles.name}>{ auth().currentUser.displayName || auth().currentUser.email.split("@")[0]}</Text>
            </View>
            <View style={{flexDirection:"row", alignSelf:"flex-start", margin:10, borderRadius:15 ,justifyContent:"center" ,padding:10, backgroundColor:"#999999"}}>
                <Text style={styles.FavoritesButton}>Fovorites</Text>
                <Icons name="angle-right" size={25} color={"black"}></Icons>
            </View>
            <Favorites navigation={navigation}></Favorites>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#595959"
    },
    Imagecontainer:{
        backgroundColor:"#292929",
        minHeight:Dimensions.get("window").height / 3,
        borderBottomRightRadius:40,
        borderBottomLeftRadius:30
    },
    image:{
        height:80,
        width:80,
        borderRadius:40,
        alignSelf:"center",
    },
    profile:{
        color:"white",
        fontSize:30,
        textAlign:"center",
        margin:15,
    },
    name:{
        color:"white",
        fontSize:35,
        fontWeight:"700",
        textAlign:"center",
        paddingTop:20,
        padding:20,
    },
    FavoritesButton:{
        color:"white",
        fontSize:20,
        fontWeight:"bold",
        marginRight:15
    }
})