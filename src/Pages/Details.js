import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Config from "react-native-config"
import useFetch from '../Hooks/useFetch'

const Details = ({route}) => {
  const id = route.params.id
  const URL = Config.API_DETAILS + id

  const {loading, data} = useFetch(URL)

  return (
    <View>
      <Text>sad</Text>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({})