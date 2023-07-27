import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import useFetch from '../Hooks/useFetch'
import Config from 'react-native-config'
import MealsCard from '../Components/MealsCard'

const MealsFilteredByArea = ({route,navigation}) => {
    const area = route.params.area
    const URL = Config.API_AREA + area
    function renderData ({item}) {return(<MealsCard navigation={navigation} item={item}></MealsCard>)}
    const {data} = useFetch(URL)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{area} Meals</Text>
      <FlatList
        data={data.meals}
        renderItem={renderData}></FlatList>
    </View>
  )
}

export default MealsFilteredByArea

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#898989',
    },
    title:{
        color:"black",
        fontSize:30,
        fontWeight:"900",
        marginHorizontal:15,
        borderBottomWidth:5
    }
})