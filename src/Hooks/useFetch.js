import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function useFetch  (url)  {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data , setData] = useState([])

  async function fetchData () {
    try {
      setLoading(true)
      const {data: reponsedData} = await axios.get(url)
      setData(reponsedData)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  const fetchFilteredData = async (filteredUrl) => {
    try {
      setLoading(true);
      const { data: filteredData } = await axios.get(filteredUrl);
      setData(filteredData);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() =>{
    fetchData();
  },[]);


  return{error, loading, data,fetchData };

}

