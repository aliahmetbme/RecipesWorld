import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import axios from 'axios';
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import MealsCard from '../Components/MealsCard';
import Loading from '../Components/Loading';

const Favorites = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findData();
  }, []);

  function findData() {
    try {database()
      .ref(`/${auth().currentUser.email.split("@")[0].split(".")[0] + auth().currentUser.email.split("@")[1].split(".")[0]}/favorites/`)
      .on("value", snapshot => {
        const favorites = snapshot.val();
        if (favorites) {
          const ids = Object.values(favorites).map(item => item.id);
          fetchDataForIds(ids);
        } else {
          setLoading(false);
          setData([]);
        }
      });
    } catch (error){
      console.log(error)
    }
  }

  const fetchDataForIds = async (ids) => {
    try {
      const promises = ids.map(async (id) => {
        const response = await axios.get(Config.API_DETAILS + id);
        return response.data;
      });

      const dataArray = await Promise.all(promises);
      setData(dataArray);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  function renderData({ item }) {
    try{if (item.meals[0] === null){return}} catch (error){return}
    return <MealsCard onPress={() => navigation.push("Details",{id: item.meals[0].idMeal})} item={item.meals[0]}></MealsCard>;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    );
  }


  return (
    <View>
      <FlatList
      horizontal={true}
      data={data} renderItem={renderData}></FlatList>
    </View>
  );
};

export default Favorites;
