import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Config from 'react-native-config'
import useFetch from '../Hooks/useFetch'

import MealsCard from '../Components/MealsCard'

const Variaites = ({route, navigation}) => {
  const category = route.params.category 
  URL = Config.API_VARIATIES + category

  const {loading, data} = useFetch(URL)

  if(loading){
    return(
      <Text>loading</Text>
    )
  }


  function renderData({item}) {return (<MealsCard navigation={navigation}item={item}></MealsCard>)}
  return (
    <View style={{flex:1,backgroundColor:"#494949"}}>
      <FlatList data={data.meals} renderItem={renderData}></FlatList>
    </View>
  )
}

export default Variaites