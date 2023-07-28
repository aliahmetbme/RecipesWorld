import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

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
        margin:15,
        borderRadius:15
    },
    button_text:{
        color:"white",
        fontSize:20
    }
})