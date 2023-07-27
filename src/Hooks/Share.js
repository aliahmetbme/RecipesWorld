import React from 'react';
import {Alert, Share, View, Button, TouchableOpacity} from 'react-native';

export default async function ShareExample (youtubeLink, title, renderData, Instruction) {

    let ingredients = ""
    for(let i = 0 ; i <= 20 ; i++){
        if(renderData[i] === undefined){break}
        ingredients += renderData[i] + "\n\n"
    }

    const shareMessage = `${title}\n\n${youtubeLink}\n\n${ingredients}\n\n${Instruction}`; // Başlık ve youtube linkini birleştiriyoruz

    try {
      const result = await Share.share({
        message: shareMessage
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
}  