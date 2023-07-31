import { StyleSheet, Text, View,ImageBackground,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
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
    width:RFPercentage(50),
    minHeight:RFPercentage(40),
    alignSelf:"center",
    borderRadius:15,
    resizeMode:"contain"
  },
  title:{
    alignSelf:"center",
    fontSize:RFPercentage(4),
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