import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
const Button = ({onPress, navigaiton, description}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <Text style={styles.button_text}>{description}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#898989",
        padding:10,
        alignItems:"center",
        margin:RFPercentage(2),
        borderRadius:15
    },
    button_text:{
        color:"white",
        fontSize:RFPercentage(2.5)
    }
})