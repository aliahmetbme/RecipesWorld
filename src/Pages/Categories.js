import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import useFetch from '../Hooks/useFetch';
import Config from 'react-native-config';
import CategoiresCard from '../Components/CategoiresCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from "@react-native-firebase/auth"
import Loading from '../Components/Loading';

const Categories = ({navigation}) => {
  const [name] = React.useState(auth().currentUser.displayName ||auth().currentUser.email.split("@")[0])
  const {error, loading, data} = useFetch(Config.API_CATEGORIES);

  function renderData({item}) {
    return (
      <CategoiresCard navigation={navigation} item={item}></CategoiresCard>
    );
  }
  
    
  if (loading) {
    console.log("loading")
    return <Loading></Loading>;
  }
  
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text multiline style={styles.welcome_message}>Welcome {name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon
            style={styles.Icon_style}
            name="account-circle"
            size={50}
            color={'#292929'}></Icon>
        </TouchableOpacity>
      </View>
      <FlatList data={data.categories} renderItem={renderData}></FlatList>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#898989',
  },
  welcome_message: {
    flex:1,
    fontSize: 30,
    fontWeight: '700',
    marginHorizontal: 15,
    margin: 10,
    color: 'white',
    fontStyle: 'italic',
  },
  Icon_style: {
    alignSelf: 'center',
    margin: 10,
  },
});
