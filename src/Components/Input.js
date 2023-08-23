import { StyleSheet, KeyboardAvoidingView, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Icon from "react-native-vector-icons/Feather"
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
const Input = ({description, isPassword, value, onChangeText}) => {
    const [shownPassword, setShownPassword] = useState(false)

    if (isPassword){
        return (
            <KeyboardAvoidingView style={styles.password_container}>
                <TextInput onChangeText={onChangeText} value={value} maxLength={10} secureTextEntry={!shownPassword} style={styles.text}  placeholder={description}></TextInput> 
                <TouchableOpacity onPress={() => setShownPassword(!shownPassword)} style={{justifyContent:"center"}}>
                    <Icon name={shownPassword ? 'eye' : 'eye-off'}  size={RFPercentage(4)} color={"black"} style={styles.Icon_container}></Icon>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    } else {
    return (
        <KeyboardAvoidingView style={styles.password_container}>
        <TextInput onChangeText={onChangeText} value={value} multiline style={styles.text} placeholder={description}></TextInput>
        </KeyboardAvoidingView>
    )
  }
}

export default Input

const styles = StyleSheet.create({
    password_container:{
        overflow:"hidden",
        flexDirection:"row",
        backgroundColor:"#DADADA",
        margin:RFPercentage(1.5),
        borderRadius:RFPercentage(1.5),
        justifyContent:"space-between",
    },
    Icon_container:{
        marginHorizontal:RFPercentage(2)
    },
    text:{
        overflow:"hidden",
        paddingVertical:RFPercentage(2),
        marginHorizontal:RFPercentage(2),
        flex:1,
        fontSize:RFPercentage(2),
        justifyContent:"center",
    }
})