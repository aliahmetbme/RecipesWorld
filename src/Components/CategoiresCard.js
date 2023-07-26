import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React from 'react'

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
    margin:15,
    marginRight:0,
    borderBottomLeftRadius:20,
    borderTopLeftRadius:20,
    padding:10
  },
  Image:{
    minWidth:200,
    minHeight:200,
    resizeMode:"contain",
    margin:10,
    borderRadius:15
  },
  title:{
    color:"white",
    fontSize:40,
    textShadowColor: '#292929',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 4,
  }
})