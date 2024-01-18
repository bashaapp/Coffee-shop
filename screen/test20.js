import React, { useState } from "react";
import{
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet
} from 'react-native'

import{
    COLORS,
    SIZES,
    FONTS,
    images,
} from '../constants'
import { FlatList } from "react-native";
import { ProductData, categoryData } from "../constants/dummyData";
import { TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import { PlusIcon, StarIcon } from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-native-shared-element";
import CartModal from "../component/CartModal";
import {
  useSharedValue,
} from "react-native-reanimated";



const getCategoriesFromData = (data) => {
  let temp = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category, data) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item) => item.name == category);
    return coffeelist;
  }
};

const Home =()=>{

  const navigation = useNavigation()

  // State
  const [categories, setCategories] = useState(getCategoriesFromData(ProductData))
  const [selected, setSelected] = useState(null)
  const [products, setProducts] = useState (ProductData)


  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, ProductData),
  );
 




  function renderCategories(){
      return(
        <View
           style={{
            marginTop:20,
           }}
        >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              >
              <TouchableOpacity
                style={{
                  height:65,
                  width:100,
                  backgroundColor:(categoryIndex?.index == index )? COLORS.bgDark:COLORS.primary2,
                  borderRadius:SIZES.base,
                  alignItems:'center',
                  justifyContent:'center',
                  marginHorizontal:SIZES.base
                }}
                onPress={() => {
                
                  setCategoryIndex({index: index, category: categories[index]});
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], products),
                  ]);
                }}>

                    {/*Images*/}

                    <Image 
                       source={data}
                       resizeMode="contain"
                       style={{
                        height:40,
                        width:40,
                        tintColor:COLORS.lightGrey60,
                      
                       }}
                    />
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index == index
                      ? {color: COLORS.primary1}
                      : {},
                  ]}>
                  {data}
                </Text>
                
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        </View>
      )
    }

    //Filter Products

    function onSelecteCategory(category){
      let productList = ProductData.filter(a => a.categories.includes(category.id))
      setProducts(productList)

      setSelected(category)
    }

    function ProductCard({sharedElementPrefix,item,onPress}){
      return(
        <TouchableOpacity style={{
          borderRadius:SIZES.radius,
          backgroundColor:'rgba(0,0,0,0.7)',
          borderColor:COLORS.primary2,
          borderWidth:1,
          height:305,
          width:230
        }}
          onPress={onPress} 
        >

          <View  style={{
              shadowColor:'black',
              shadowRadius:30,
              shadowOffset:{width:0,height:40},
              shadowOpacity:0.5,
              alignItems:'center',
              marginTop:-SIZES.margin
              
          }}>
            <SharedElement
              id={`${sharedElementPrefix}-ProductCard-Bg-${item?.id}`}
              // style={[StyleSheet.absoluteFillObject]} 
            >
              <Image 
                 source={item.image}
                 style={{
                  height:120,
                  width:120
                 }}
              />
              </SharedElement>
          </View>

          {/*product name*/}
          <View style={{
            marginTop:SIZES.margin,
            marginHorizontal:SIZES.font
          }}>
            <Text style={{
              fontWeight:'bold',
              ...FONTS.h2,
              color:COLORS.primary1
            }}>
              {item.name}
            </Text>
          </View>

          {/*product rate*/}
          <View
             style={{
              marginTop:SIZES.font,
              marginHorizontal:SIZES.font,
              backgroundColor:COLORS.primary2,
              flexDirection:'row',
              alignItems:'center',
              borderRadius:SIZES.radius,
              width:53,
              height:30,
              paddingHorizontal:5,
              
             }}
          >
            <StarIcon  size={15}  color={COLORS.bgDark}/>
              <Text style={{
                ...FONTS.h4,
                marginLeft:3,
                color:COLORS.primary1,
                fontWeight:'700'
              }}>{item.stars}</Text>
          </View>

          {/*volume*/}
          <View style={{
              marginTop:SIZES.font,
              marginHorizontal:SIZES.font,
              flexDirection:'row',
          }}>
            <Text style={{
              ...FONTS.body4,
              color:COLORS.primary1,
              
            }}>Volume</Text>
             <Text style={{
              ...FONTS.body4,
              color:COLORS.primary1,
              fontWeight:'800',
              paddingHorizontal:SIZES.base
            }}>{item.volume}</Text>
          </View>

          {/*price*/}
          <View style={{
                  marginTop:SIZES.margin,
                  marginHorizontal:SIZES.font,
                  flexDirection:'row',
                  justifyContent:'space-between',
                  alignItems:'center'
               }}>

                <Text
                    style={{
                      ...FONTS.h3,
                      color:COLORS.primary,
                      fontWeight:'800'
                    }}
                >${item.price}</Text>

                <TouchableOpacity style={{
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.bgDark,
                    padding:6,
                    marginTop:-SIZES.font
                   
                }}>
                   <PlusIcon 
                     size='20' strokeWidth={2} color={COLORS.primary1}
                   />
                </TouchableOpacity>

          </View>

        </TouchableOpacity>
      )
    }


    function renderProduct(){
      return(
        <View
           style={{
               marginTop:SIZES.padding,
               marginHorizontal:-10
           }}
        >
          <Carousel 
            containerCustomStyle={{overflow:'visible'}}
            data={sortedCoffee}
            loop={true}
            renderItem={({item})=>
            <ProductCard 
             sharedElementPrefix='Home'
            item={item} 
            onPress={()=> navigation.navigate('ProductDetails',
            {item:item,sharedElementPrefix:'Home'} )}/>}
            firstItem={1}
            inactiveSlideOpacity={0.75}
            inactiveSlideScale={0.77}
            sliderWidth={400}
            itemWidth={240}
            slideStyle={{display:'flex',alignItems:'center'}}
          
          />

        </View>
      )
    }



    return(
        <ImageBackground
             style={{flex:1,}}
             source={images.bb}>
          
            {/*renderCatogeries*/}
            {renderCategories()}

            {/*renderProduct*/}
            {renderProduct()}



        </ImageBackground>
    )

}


const styles = StyleSheet.create({
 
 
  CategoryText: {
 
    fontSize: SIZES.h3,
    color: COLORS.primary,
    marginBottom: SIZES.radius,
  },
  ActiveCategory: {
    height: 15,
    width: 20,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },

});


export default Home;