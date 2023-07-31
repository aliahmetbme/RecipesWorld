import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { RFPercentage } from "react-native-responsive-fontsize"
const CategoiresCard = ({navigation, item }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Variaites",{
      category:item.strCategory
    })} style={styles.container}>
        <Text style={styles.title}>{item.strCategory}</Text>
        <Image style={styles.Image} source={{uri : item.strCategoryThumb}}></Image>
    </TouchableOpacity>
  )
}

export default CategoiresCard

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#292929",
    margin:RFPercentage(3),
    marginLeft:RFPercentage(6),
    marginRight:0,
    borderBottomLeftRadius:20,
    borderTopLeftRadius:20,
    padding:RFPercentage(2)
  },
  Image:{
    minWidth:RFPercentage(20),
    minHeight:RFPercentage(35),
    resizeMode:"contain",
    margin:RFPercentage(2),
    borderRadius:15,
  },
  title:{
    color:"white",
    fontSize:RFPercentage(5),
    textShadowColor: '#DADADA',
    textShadowOffset: { width: RFPercentage(0.5), height: RFPercentage(0.5) },
    textShadowRadius: RFPercentage(0.5),
  }
})