import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import Config from 'react-native-config'
import useFetch from '../Hooks/useFetch'

import MealsCard from '../Components/MealsCard'
import Loading from '../Components/Loading'

const Variaites = ({route, navigation}) => {
  const category = route.params.category 
  URL = Config.API_VARIATIES + category

  const {loading, data} = useFetch(URL)

  if(loading){
    return(
      <Loading></Loading>
      )
  }


  function renderData({item}) {return (<MealsCard onPress={() => navigation.navigate("Details", { id: item.idMeal })} item={item}></MealsCard>)}
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#494949"}}>
      <FlatList data={data.meals} renderItem={renderData}></FlatList>
    </SafeAreaView>
  )
}

export default Variaites