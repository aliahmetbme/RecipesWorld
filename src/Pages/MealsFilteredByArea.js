import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import useFetch from '../Hooks/useFetch'
import Config from 'react-native-config'
import MealsCard from '../Components/MealsCard'
import Loading from '../Components/Loading'
import {RFPercentage} from "react-native-responsive-fontsize"

const MealsFilteredByArea = ({route,navigation}) => {
    const area = route.params.area
    const URL = Config.API_AREA + area
    function renderData ({item}) {
      return(
      <MealsCard item={item} onPress={() => navigation.push("Details", { id: item.idMeal })}></MealsCard>
    )}
    
    const {loading,data} = useFetch(URL)
    
    if(loading){
      return(
        <Loading></Loading>
      )
    }
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
        fontSize:RFPercentage(3.5),
        fontWeight:"900",
        marginHorizontal:15,
        borderBottomWidth:5
    }
})