import { StyleSheet, Text, View,ImageBackground,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'

const MealsCard = ({onPress, item}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ImageBackground style={{flex:1,justifyContent:"flex-end", borderRadius:15 }}  source={{uri: item.strMealThumb}}>
        <View style={styles.title_container}>
          <Text style={styles.title}>{item.strMeal}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default MealsCard

const styles = StyleSheet.create({
  container:{
    margin:10,
    marginHorizontal:15,
    width:Dimensions.get("screen").width * 0.9,
    height:Dimensions.get("screen").height / 3,
    alignSelf:"center",
    borderRadius:15
  },
  title:{
    alignSelf:"center",
    fontSize:26,
    textAlign:"center",
    margin:10,
    fontWeight:"900",
    color:"white",
    textShadowColor: 'gray',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 4,
    opacity:0.9
  },
  title_container:{
    backgroundColor:"#898989",
    opacity:0.7
  }
})