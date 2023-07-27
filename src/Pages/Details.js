import { StyleSheet,  Text,  View,Button, Alert ,TouchableOpacity ,ScrollView,  Image,  Dimensions,} from 'react-native';
import React, {useCallback} from 'react';
import Config from 'react-native-config';
import useFetch from '../Hooks/useFetch';
import Loading from '../Components/Loading';
import YouTubeButton from '../Components/YouTubeButton';
import Share from "../Hooks/Share"
import Icon from "react-native-vector-icons/FontAwesome"


const Details = ({route, navigation}) => {
  
  const id = route.params.id;
  const URL = Config.API_DETAILS + id;
  let renderData= null
  let renderTags = null
  const {error, loading, data} = useFetch(URL);
  const meals = data?.meals?.length ? data.meals[0] : null;

  if (loading) {
    return <Loading></Loading>;
  }
  if (error) {
    return <Text>ERROR</Text>;
  }
  if (!meals) {
    return <Text>Bir hata oluştu.</Text>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const measure = meals[`strMeasure${i}`];
    const ingredient = meals[`strIngredient${i}`];
    if (measure && ingredient && ingredient.includes("")) {
      ingredients.push(measure + " " + ingredient);
    } else {
      break;
    }
  }
  
  if (ingredients) {
     renderData = ingredients.map((item, index) => {
      return(
        <View key={index} style={{}}>
          <Text style={{color:"white", fontSize:17}}>{item}</Text>
        </View>
      )
    })
  }

  meals.strTags ? renderTags = meals.strTags.split(",").map((item, index) =>{
    return(
      <View key={index} style={{flexWrap:"wrap",flexDirection: 'row',}}>
        <Text  style={styles.Tags}># {item}</Text>
      </View>
    )
  }) : null

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: meals.strMealThumb}} style={styles.Image}></Image>
          <Text style={styles.title}>{meals.strMeal}</Text>
          <View style={{flexDirection:"row", flexWrap:"wrap"}}>
            {renderTags ? renderTags : null}
          </View>
          <View style={{flexDirection:"row", padding:5, justifyContent:"space-between"}}>
          <YouTubeButton url={meals.strYoutube}></YouTubeButton>
          <TouchableOpacity onPress={() => Share(meals.strYoutube, meals.strMeal, ingredients, meals.strInstructions)}>
            <Icon name="share-alt" size={45} color="white" style={styles.share}></Icon>
          </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("MealsFilteredByArea",{
            area: meals.strArea
          })} >
            <Text style={styles.area}>{meals.strArea} meal</Text>
          </TouchableOpacity> 
          { renderData ? <View style={styles.Ingredient}>
            <Text style={styles.IngredientTitle}>INGREDIENTS</Text>
            {renderData}</View> : null}
            <Text style={styles.InstructionTitle}>INSTRUCTION</Text>
          <Text style={styles.Instruction}>{meals.strInstructions}</Text>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#494949',
    flex:1
  },
  title: {
    alignSelf: "flex-start",
    margin: 10,
    fontSize: 30,
    color: 'white',
    textShadowColor: 'gray',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 2,
  },
  Image: {
    minWidth: Dimensions.get('screen').width,
    minHeight: Dimensions.get('screen').height / 2,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  },
  area: {
    color: 'white',
    backgroundColor: '#696969',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    marginHorizontal: 15,
    margin: 10,
    fontWeight: 'bold',
  },
  Ingredient:{
    marginVertical:15,
    borderBottomWidth:2,
    borderBottomColor:"white",
    padding:10,
    paddingTop:0
  },
  IngredientTitle:{
    color:"white",
    fontWeight:"900",
    fontSize:22,
    marginTop:0,
    marginVertical:5,
  },
  Instruction:{
    color:"white",
    margin:15,
    fontSize:19,
  },
  InstructionTitle:{
    color:"white",
    margin:10,
    marginVertical:5,
    fontSize:22,
    fontWeight:"bold"
  },
  Tags:{color:"white", margin:10, backgroundColor:"#797979", alignSelf:"flex-start", padding:10, borderRadius:15,fontSize:22},
  share:{
    verticalAlign:"middle",
    flex:1,   
    marginHorizontal:15
  }
});
