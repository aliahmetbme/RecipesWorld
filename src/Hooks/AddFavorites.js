import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"

export default function useFavorites (id) {
    const [isFavorite, setFavorite] = React.useState(false)
    
    function checkIsFavorite() {

        database()
          .ref(`/${auth().currentUser.email.split("@")[0].split(".")[0] + auth().currentUser.email.split("@")[1].split(".")[0]}/favorites/${id}`)
          .once("value", snapshot => {
            if (snapshot.exists()) {
              setFavorite(true);
            } else {
              setFavorite(false);
            }
          });
    }

    
    
    const addFavorites = ()  => {
        if (!isFavorite) { 
        database()
        .ref(`/${auth().currentUser.email.split("@")[0].split(".")[0] + auth().currentUser.email.split("@")[1].split(".")[0]}/favorites/${id}/`)
        .update({
            id
        })

            setFavorite(true)
        } else {
            database()
            .ref(`/${auth().currentUser.email.split("@")[0].split(".")[0] + auth().currentUser.email.split("@")[1].split(".")[0]}/favorites/${id}`)
            .remove()
            setFavorite(false)
        }
    }


    return {isFavorite, addFavorites, checkIsFavorite};

}


const styles = StyleSheet.create({})