import { View, Text, Linking , TouchableOpacity} from 'react-native'
import React, {useCallback} from 'react'
import Icon from "react-native-vector-icons/Ionicons"

export default function YouTubeButton ({url})  {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
      // android manifest e <uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
      // ekle
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return (
        <TouchableOpacity onPress={handlePress} style={{backgroundColor:"gray",padding:10,borderRadius:15,marginTop:10,marginHorizontal:10,alignSelf:"flex-start",flexDirection:"row", alignItems:"center"}}>
            <Icon name="logo-youtube" size={45} color="red"></Icon>
            <Text style={{marginHorizontal:10, fontSize:20, fontWeight:"bold", color:"white"}}>Watch on YouTube</Text>
        </TouchableOpacity>
    )
  };

