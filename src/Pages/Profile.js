import { StyleSheet, Text, View, FlatList , Dimensions, TouchableOpacity ,ScrollView,Image} from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import Icon from "react-native-vector-icons/Ionicons"
import Icons from "react-native-vector-icons/FontAwesome"
import {GoogleSignin} from "@react-native-google-signin/google-signin"
import Favorites from "./Favorites"
import {RFPercentage} from "react-native-responsive-fontsize"
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
   };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.Imagecontainer}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Categories")}>
                        <Icon name="home" size={RFPercentage(5)} color="#898989" style={{margin:RFPercentage(3)}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={signOut}>
                        <Icons name="sign-out" size={RFPercentage(5)} color="#898989" style={{margin:RFPercentage(3)}} ></Icons>
                    </TouchableOpacity>
                </View>
                <Text style={styles.profile}>My Profile</Text>
                <Image style={styles.image} source={{uri: source}}></Image>
                <Text style={styles.name}>{ auth().currentUser.displayName || auth().currentUser.email.split("@")[0]}</Text>
            </View>
            <View style={{flexDirection:"row", alignSelf:"flex-start", justifyContent:"center",margin:10, borderRadius:RFPercentage(1.5) ,justifyContent:"center" ,padding:RFPercentage(1), backgroundColor:"#999999"}}>
                <Text style={styles.FavoritesButton}>Fovorites</Text>
                <Icons name="angle-right" size={RFPercentage(3)} color={"black"} style={{alignSelf:"center"}}></Icons>
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
        minHeight:Dimensions.get("window").height / 2.5,
        borderBottomRightRadius:RFPercentage(4),
        borderBottomLeftRadius:RFPercentage(4)
    },
    image:{
        height:RFPercentage(15),
        width:RFPercentage(15),
        borderRadius:RFPercentage(15) / 2,
        alignSelf:"center",
    },
    profile:{
        color:"white",
        fontSize:RFPercentage(4.5),
        textAlign:"center",
        margin:15,
    },
    name:{
        color:"white",
        fontSize:RFPercentage(4),
        fontWeight:"700",
        textAlign:"center",
        paddingTop:20,
        padding:20,
    },
    FavoritesButton:{
        color:"white",
        fontSize:RFPercentage(2.5),
        fontWeight:"bold",
        marginRight:RFPercentage(1.5)
    }
})