import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Icon from "react-native-vector-icons/Feather"

const Input = ({description, isPassword, value, onChangeText}) => {
    const [shownPassword, setShownPassword] = useState(false)

    if (isPassword){
        return (
            <View style={styles.password_container}>
                <TextInput onChangeText={onChangeText} value={value} maxLength={10} secureTextEntry={!shownPassword} style={styles.text}  placeholder={description}></TextInput> 
                <TouchableOpacity onPress={() => setShownPassword(!shownPassword)} style={{justifyContent:"center"}}>
                    <Icon name={shownPassword ? 'eye' : 'eye-off'}  size={30} color={"black"} style={styles.Icon_container}></Icon>
                </TouchableOpacity>
            </View>
        )
    } else {
    return (
        <View style={styles.password_container}>
        <TextInput onChangeText={onChangeText} value={value} multiline style={styles.text} placeholder={description}></TextInput>
        </View>
    )
  }
}

export default Input

const styles = StyleSheet.create({
    password_container:{
        flexDirection:"row",
        backgroundColor:"#DADADA",
        margin:15,
        borderRadius:20,
        justifyContent:"space-between"
    },
    Icon_container:{
        marginHorizontal:15
    },
    text:{
        paddingVertical:15,
        marginHorizontal:15,
        flex:1
    }
})