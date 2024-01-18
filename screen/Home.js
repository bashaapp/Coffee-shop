import React, { useState,useEffect } from "react";
import{
    View,
    Text,
    Image,
    ImageBackground,
} from 'react-native';
import { TextInput } from "react-native";


import{
  COLORS,
  SIZES,
  FONTS,
  images,
  icons
} from '../constants'
import { FlatList } from "react-native";
import { ProductData, categoryData } from "../constants/dummyData";
import { TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import { PlusIcon, StarIcon } from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-native-shared-element";
import CartModal from "../component/CartModal";
import { useDispatch } from "../Context/Context";
import AnimatedLottieView from "lottie-react-native";
import Animated, { useAnimatedStyle, useSharedValue,} from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";



const Home =()=>{

  const navigation = useNavigation()

  const animatedY = useSharedValue(0)
  const animatedX= useSharedValue(0)
  const scale = useSharedValue(0)
  const scale2 = useSharedValue(1)
  const[clicked, setClicked] = useState(false)
  const animatedStyle = useAnimatedStyle(
     ()=>{
        return{
           transform:[
              {translateX:animatedX.value},
              {translateY:animatedY.value},
              {scale:scale.value}
           ],
        }
     }
   )
   const animatedStyle2 = useAnimatedStyle(
     ()=>{
        return{
           transform:[
            
              {scale:scale2.value}
           ],
        }
     }
   )


   const toast = useToast();

  


  
  // Animation
  const modalSharevalue1 = useSharedValue(SIZES.height)
  const modalSharevalue2 = useSharedValue(SIZES.height)
  
 
  // State
  const [categories, setCategories] = useState(categoryData)
  const [selected, setSelected] = useState(null)
  const [productst, setProducts] = useState (ProductData)
  const [searchText, setSearchText] = useState('');
  const [cartCount, setCartCount]=React.useState(0);


 
  {/*Add Item to Cart*/}
  const dispatch = useDispatch();
  const addToCart = (item)=>{
      dispatch({type:'ADD', payload:item});
  }

  
  
  // Search product function
  function handleSearch(text){
      const filterData = ProductData.filter((item)=>{
      return item.name.toLowerCase().includes(text.toLowerCase())
    })

    setProducts(filterData)
    setSearchText(text)
  }



  // Render
  function renderSearchBar(){
        return(
            <View
               style={{
                marginTop:SIZES.margin,
               }}
            >
            {/*Search Input*/}  
            <View>
                <TouchableOpacity 
                     onPress={()=>{}} 
                     style={{
                          flexDirection:'row',
                          alignSelf:'center',
                      }}>
                    <TextInput 
                      placeholder=" Find Your Favourite..."
                      placeholderTextColor={COLORS.lightGrey20}
                      value={searchText}
                      onChangeText={text=>handleSearch(text)}
                      style={{
                        height:38,
                        width:300,
                        borderRadius:SIZES.radius,
                        backgroundColor:'#141313',
                        paddingLeft:SIZES.margin,
                        color:COLORS.gray
                      }}
                    />
                      {/*Search Icon*/}
                      <Image 
                           source={icons.search}
                           style={{
                            position:'absolute',
                            marginLeft:10,
                            alignSelf:'center',
                            width:20,
                            height:20,
                            tintColor: searchText.length > 0
                                ? COLORS.primary
                                : COLORS.primary1,
                            paddingHorizontal:-20
                           }}
                      />
            </TouchableOpacity>
                 </View>

            </View>
        )
    }



    function renderCategories(){
      return(
        <View
           style={{
            marginTop:20,
           }}
        >
            <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={item=>item.id}
              renderItem={({item,index})=>{
                return(
                  <TouchableOpacity  
                     
                     onPress={()=>onSelecteCategory(item)}
                     style={{
                       height:65,
                       width:100,
                       backgroundColor:(selected?.id == item.id )? COLORS.bgDark:COLORS.primary2,
                       borderRadius:SIZES.base,
                       alignItems:'center',
                       justifyContent:'center',
                       marginHorizontal:SIZES.base
                     }}
                  >

                    {/*Images*/}

                    <Image 
                       source={item.icon}
                       resizeMode="contain"
                       style={{
                        height:40,
                        width:40,
                        tintColor:COLORS.lightGrey60,
                      
                       }}
                    />

                    <Text style={{
                        ...FONTS.body4,
                        color:COLORS.lightGrey60,
                        fontWeight:'600'

                    }}>
                      {item.title}
                    </Text>

                  </TouchableOpacity>
                )
              }}
            
            />

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
              <View style={{
                    borderRadius:SIZES.radius,
                    backgroundColor:'rgba(0,0,0,0.7)',
                    borderColor:COLORS.primary2,
                    borderWidth:1,
                    height:305,
                    width:230
                  }}
                    
        >

          <TouchableOpacity  
             onPress={onPress} 
             style={{
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
          </TouchableOpacity>

          {/*product name*/}
          <View style={{
            marginTop:SIZES.margin,
            marginHorizontal:SIZES.font,
            flexDirection:'row',
            justifyContent:'space-between'
          
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
              flexDirection:'row',
              marginTop:SIZES.font,
              marginHorizontal:SIZES.font,
              backgroundColor:COLORS.primary2,
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
                >${item.price.toFixed(2)}</Text>


                   {/*Add To Cart Button*/}
            <Animated.View
              style={[
               {
                  width:30,
                  height:30,
                  borderRadius:15,
                  backgroundColor:COLORS.bgDark,
                  justifyContent:'center',
                  alignItems:'center',
                  alignSelf:'center',
                  bottom:10
                 },animatedStyle
              ]}
            >
               <Text
                   style={{
                     fontSize:15,
                     fontWeight:'bold',
                     color:COLORS.white
                 }}
               >{'+1'}</Text>
            </Animated.View>

                <TouchableOpacity style={{
                    borderRadius:SIZES.base,
                    borderBottomEndRadius:60,
                    borderTopEndRadius:60,
                    backgroundColor:COLORS.bgDark,
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:10,
                    width:110,
                    paddingHorizontal:15,
                    height:35,
                    marginTop:-SIZES.base
                   
                }}
                
                onPress={()=> {addToCart(item),toast.show("Product added successfully", {
                  type: "normal",
                  placement: "top",
                  duration: 1000,
                  offset: 30,
                  animationType: "slide-in | zoom-in",
                  normalColor:COLORS.bgDark,
                  swipeEnabled:true
                });}}>
                    <Text style={{color:COLORS.white, marginHorizontal:2, fontWeight:'500'}}>
                       Add to Cart</Text>
                   <Image
                      source={icons.plus}
                       style={{
                        width:25,
                        height:25,
                        tintColor:COLORS.primary1
                       }}
                   />
                 
                </TouchableOpacity>

          </View>

        </View>
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
            data={productst}
            loop={true}
            ListEmptyComponent={
              <View style={{
                flex:1,
                 justifyContent:'center',
                 alignItems:'center',
                 marginVertical:-10,
                
              }}>

                <AnimatedLottieView
                        style={{height:130,}}
                        source={icons.search_failed}
                        autoPlay
                        loop
                     />

                <Text style={{
                  fontSize:SIZES.h4,
                  color:COLORS.grey,
                  fontWeight:'300',
                  
                }}> No Product Available...</Text>
              </View>
            }
            renderItem={({item,index})=>
            <ProductCard 
            key={index.id}
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

            {/*renderSearchBar*/}
            {renderSearchBar()}

          
            {/*renderCatogeries*/}
            {renderCategories()}

            {/*renderProduct*/}
            {renderProduct()}
             {/*renderCartModal*/}
             <CartModal
              modalSharevalue1={modalSharevalue1}
              modalSharevalue2={modalSharevalue2}
             />



        </ImageBackground>
    )

}


export default Home;