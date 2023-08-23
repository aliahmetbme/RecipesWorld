import { StyleSheet,  Text,  View,Button, Alert ,TouchableOpacity ,ScrollView,  Image,  Dimensions, Platform,} from 'react-native';
import React, {useCallback} from 'react';
import Config from 'react-native-config';
import useFetch from '../Hooks/useFetch';
import Loading from '../Components/Loading';
import YouTubeButton from '../Components/YouTubeButton';
import Share from "../Hooks/Share";
import Icon from "react-native-vector-icons/FontAwesome";
import useFavorites from '../Hooks/AddFavorites';
import { RFPercentage } from "react-native-responsive-fontsize"


const Details = ({route, navigation}) => {
  const id = route.params.id;
  const [URL] = React.useState(Config.API_DETAILS + id);
  const {isFavorite, addFavorites, checkIsFavorite} = useFavorites(id)
  let renderData= null
  let renderTags = null
  const {error, loading, data} = useFetch(URL);
  const meals = data?.meals?.length ? data.meals[0] : null;
  
  React.useEffect(() => {
    checkIsFavorite();
  }, []);
    
  if (loading) {
    return <Loading></Loading>;
  }
  if (error) {
    return <Text>ERROR</Text>;
  }
  if (!meals) {
    return <Text>Bir hata oluştu.</Text>;
  }

  // malzemeleri ölçüleriyle birlikte belirliyor
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
  console.log(RFPercentage(6))
  
  if (ingredients) {
     renderData = ingredients.map((item, index) => {
      return(
        <View key={index} style={{}}>
          <Text style={{color:"white", fontSize:RFPercentage(2.5)}}>{item}</Text>
        </View>
      )
    })
  }

  // Taglari mapliyor
  meals.strTags ? renderTags = meals.strTags.split(",").map((item, index) =>{
    return(
      <View key={index} style={{flexWrap:"wrap",flexDirection: 'row',}}>
       { item ? <Text  style={styles.Tags}># {item}</Text> : null}
      </View>
    )
  }) : null

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: meals.strMealThumb}} style={styles.Image}></Image>
          <View style={{flexDirection:"row", marginVertical:10}}>
            <Text style={styles.title}>{meals.strMeal}</Text>
            <TouchableOpacity onPress={addFavorites}>
              { isFavorite ? <Icon style={styles.favorites_button} name="heart" size={RFPercentage(6)} color={"red"}></Icon> : <Icon style={styles.favorites_button} name="heart" size={RFPercentage(6)} color={"white"}></Icon>}
            </TouchableOpacity>
          </View>
          { Platform.OS === "ios" ? <Icon name="arrow-left" size={RFPercentage(4)} style={styles.GoBack} onPress={() => navigation.goBack()}color="white"></Icon> : null}
          <View style={{flexDirection:"row", flexWrap:"wrap"}}>
            {renderTags ? renderTags : null}
          </View>
          <View style={{flexDirection:"row", padding:5, justifyContent:"space-between", alignItems:"center",flexWrap:"wrap"}}>
          <YouTubeButton url={meals.strYoutube}></YouTubeButton>
          <TouchableOpacity onPress={() => Share(meals.strYoutube, meals.strMeal, ingredients, meals.strInstructions)}>
            <Icon name="share-alt" size={RFPercentage(6)} color="white" style={styles.share}></Icon>
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
    flex:1,
    alignSelf: "flex-start",
    margin: 10,
    fontSize: RFPercentage(3.5),
    color: 'white',
    textShadowColor: 'gray',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 2,
  },
  Image: {
    overflow:"hidden",
    minWidth: Dimensions.get('screen').width,
    minHeight: Dimensions.get('screen'). height / 2,
    borderBottomLeftRadius:RFPercentage(4),
    borderBottomRightRadius:RFPercentage(4),
  },
  area: {
    color: 'white',
    backgroundColor: '#696969',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
    fontSize: RFPercentage(2.8),
    marginHorizontal: 15,
    margin: 10,
    fontWeight: 'bold',
  },
  Ingredient:{
    marginVertical:15,
    borderBottomWidth:2,
    borderBottomColor:"white",
    padding:10,
    paddingTop:0,
    fontSize:RFPercentage(2.9)
  },
  IngredientTitle:{
    color:"white",
    fontWeight:"900",
    fontSize:RFPercentage(3.2),
    marginTop:0,
    marginVertical:5,
  },
  Instruction:{
    color:"white",
    margin:15,
    fontSize:RFPercentage(3),
  },
  InstructionTitle:{
    color:"white",
    margin:15,
    marginVertical:5,
    fontSize:RFPercentage(3.2),
    fontWeight:"bold"
  },
  Tags:{color:"white", margin:10,marginLeft:15, backgroundColor:"#797979", alignSelf:"flex-start", padding:10, borderRadius:15,fontSize:RFPercentage(3)},
  share:{
    marginHorizontal:25,
    verticalAlign:"middle",
    margin:15
  },
  favorites_button:{
    overflow:"hidden",
    verticalAlign:"middle",
    marginRight:15,
    padding:RFPercentage(2),
    backgroundColor:"#DADADA",
    alignSelf:"center",
    borderRadius: Platform.OS === "android" ? RFPercentage(6) : RFPercentage(5),
    margin:15
  },
  GoBack:{
    padding:RFPercentage(1),
  }
});
