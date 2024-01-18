import React, {useContext,useEffect, useRef, useState } from "react";
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated as ReactAnimated
} from 'react-native';

import { COLORS, FONTS, SIZES, constants, icons, images } from "../constants";
import { SharedElement } from "react-native-shared-element";
import { ImageBackground } from "react-native";
import {TextButton} from '../component'
import { StarIcon } from "react-native-heroicons/solid";
import * as Animatable from 'react-native-animatable';
import { useDispatch } from "../Context/Context";
import { useCart } from '../Context/Context';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";




const ProductDetails =({navigation, route})=>{

   // Animations
   const {item,sharedElementPrefix} = route.params
   const opacity = useRef(new ReactAnimated.Value(0)).current;
   const imageRef = useRef(null)
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


   // add favorite product function into favorite screen
    const addProductToFavorite = (item) => {
      dispatch({type: "ADD_PRODUCT_TO_FAVORITE", payload:item });
      
    };


  // States animation Like Icon
  const index = 10;
  const [liked, setLiked] = useState(false)
  const [visible, setVisible] = useState(false)
  const [counter, setCounter] = useState(-2)
  const current = new ReactAnimated.Value(1)

     {/*Change Basket Value*/}
   const {cart} = useCart();
   const [cartCount, setCartCount]=React.useState(0);
   const [dark, setDark] = useState(false)
   const [price, setPrice] = useState(item.prices[0])


    //function to Handle like Icon
    function likedHandler(){
      if(liked == false)
        setVisible(true)
        setLiked(!liked)
        setCounter(index) 
    }

    //Animation Like Icon
    useEffect(()=>{
      if(liked == true){
          ReactAnimated.spring(current,{
              toValue:3,
              friction:2,
              useNativeDriver:true
          }).start(()=>{
              ReactAnimated.spring(current,{
                  toValue:1,
                  useNativeDriver:true,
                  friction:2
              }).start(()=>{
                  setVisible(false)
              })
          })
      }
  })

  
  
   useEffect(()=>{
         let count = 0;
         cart.forEach((item)=>{
         count +=item.qty;
        });
        setTimeout(() => {
         setCartCount(count)
        }, 1050);
    })
   
    
       {/*Add Item to Cart*/}
   const dispatch = useDispatch();
   const addToCart = (item)=>{
          dispatch({type:'ADD', payload:item});
      }



   {/*Product Animation */} 
   useEffect(()=>{
      ReactAnimated.timing(opacity,{
         toValue:1,
         duration:300,
         delay:3300,
         useNativeDriver:false,

      }).start();
     },[])

   useEffect(()=>{
      if(item){
        imageRef.current.animate({0:{scale:.5,rotate:'0deg'},1:{scale:1.6,rotate:'1085deg'}});
      }else{
        imageRef.current.animate({0:{scale:1,rotate:'360deg'},1:{scale:1,rotate:'0deg'}});

      }
    },[item])  




   function  renderHeader(){
      return(
          <View
             style={{
                marginTop:SIZES.margin,
             }}
          >

            {/*title, icon back and cart*/}
            <View
               style={{
                  flexDirection:'row',
                  justifyContent:'space-between',
                  marginHorizontal:SIZES.radius
               }}
            >              
                {/*back Icon*/}
                <TouchableOpacity
                  onPress={()=>navigation.goBack()}
                >
                    <Image 
                       source={icons.arrow_left}
                       style={{
                           width:25,
                           height:25,
                           tintColor:COLORS.lightGrey60
                  }}
                />
                </TouchableOpacity>


                {/*title*/}
                <Text
                  style={{
                    color:COLORS.bgDark,
                    ...FONTS.h2,
                    fontWeight:'500'
                  }}
                >CoffeeShop</Text>

                  {/*cart*/}
                  <Image 
                     source={icons.shoppingBag}
                     style={{
                        width:22,
                        height:22,
                        tintColor:COLORS.lightGrey60

                      }}
                 />
                  <TouchableOpacity
                       onPress={()=>navigation.navigate("Cart")}
                      style={{
                          position:'absolute',
                          bottom:14,
                          left:304,
                          width:28,
                          height:28,
                          borderRadius:30,
                          color:COLORS.primary,
                          backgroundColor: dark ? COLORS.black: COLORS.bgDark,
                          opacity:0.7,
                          justifyContent:'center',
                          alignItems:'center'
                  
                }}
                
                >
                    <Animated.Text
                       style={[
                        {
                           fontSize:15,
                           fontWeight:'bold',
                           color:COLORS.white
                       },animatedStyle2
                       ]}
                    >{cartCount}</Animated.Text>
                </TouchableOpacity>

                </View>

          <ImageBackground
             source={images.background_20}
             style={{
              marginTop:SIZES.radius,
              width:270,
              height:270,
              padding:100,
              alignSelf:'center',
              paddingBottom:200,
             
             }}
          >
            <SharedElement
              id={`${sharedElementPrefix}-ProductCard-Bg-${item?.id}`}
                style={[StyleSheet.absoluteFillObject]}
              
            >

            <Animatable.Image 
                  animation='zoomIn'
                  ref={imageRef}
                  duration={2000}
                  source={item.image}
                  resizeMode="contain"
                  style={{
                     height:'42%',
                     width:'42%',
                     alignSelf:'center',
                     marginTop:55,
                     justifyContent:'center',
                     alignItems:'center'
                  }}
                  
                />
            </SharedElement>

            {item.prices.map((data)=>(

            
            <Animatable.View
                 animation='fadeIn'
                 duration={200}
                 delay={1000}
                 style={[
                  (data.size == constants.productSize.small? { position:'absolute',
                  top:50,
                  bottom:0,
                  right:0,
                  left:-200,}
                  :(data.size == constants.productSize.medium)?'':{ position:'absolute',
                  top:50,
                  bottom:0,
                  right:0,
                  left:200,})
                 ]}
                  >
            <TextButton 
               label={data.size}
               contentContainerStyle={{
                width:37,
                height:37,
                borderRadius:30,
                borderWidth:2,
                borderColor:COLORS.lightGrey08,
                backgroundColor: data.size == price.size?
                COLORS.primary:COLORS.primary2,
                borderRadius:30,
                alignSelf:'center',
                justifyContent:'center',
                marginTop:115 
               }}

               labelStyle={{
                ...FONTS.body2,
                color: data.size == price.size?
                COLORS.primary2:COLORS.primary1,
                alignSelf:'center',
                fontWeight:'700'
               }}

               onPress={()=>{
                  setPrice(data);
               }}
            />

             </Animatable.View>

            ))}
              {/*Animated LIKE Icon View*/}
              <View style={style.animatedView}>
                    {visible && (index==counter) &&
                      <ReactAnimated.View style= {{transform:[{scale:current}]}}>
                            <Image 
                  source={icons.love}
                  resizeMode='cover'
                  style={{
                      marginBottom:40,
                      height:40,
                      width:40,
                      tintColor:COLORS.red,
                      alignSelf:'center'
                      //right:SIZES.padding,
                     // top:SIZES.padding,
                  }}
                  />
                      </ReactAnimated.View>
                      
                     }

                  </View>
            </ImageBackground>
          </View>
      )
   }


   function renderBody(){
      return(
        <Animatable.View 
             animation='fadeInUpBig'
             duration={300}
             delay={1000}
        style={{
            marginTop:-40,
        }}>

         {/*Product Details*/}
         <View style={{
            width:'90%',
            height:120,
            borderTopLeftRadius:SIZES.padding,
            borderTopRightRadius:SIZES.padding,
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.lightGrey08,
            paddingHorizontal:SIZES.padding,
            alignSelf:'center'
         }}>

            <View
               style={{
                  flexDirection:'row',
                  justifyContent:'space-between'
               }}
            >
               <Text
                  style={{
                     marginTop:SIZES.font,
                     marginLeft:-SIZES.radius,
                     fontWeight:'600',
                     ...FONTS.h2,
                     color:COLORS.primary1
                  }}
               >{item.name}</Text>

               {/*Like Icon*/}
               <TouchableOpacity
               onPress={()=>(addProductToFavorite(item),likedHandler())} 
               style={{
                  marginTop:10,
                  height:50,
                  width:50,
                  left:30,
                  borderRadius:SIZES.radius2_1,
                  backgroundColor:COLORS.grey20,
                  justifyContent:'center',
                  alignItems:'center'
               }}
            >
               <Image 
                  source={liked && (index == counter)? icons.love:icons.love_}
                  resizeMode="contain"
                  style={{
                     width:25,
                     height:25,
                  }}
              />
            </TouchableOpacity>   
            </View>

            <View
               style={{
                  marginTop:1,
                  marginLeft:-15, 
               }}
               >
                  <Text
                     style={{
                        color:COLORS.lightGrey20,
                        fontWeight:'bold'
                     }}
                  >With Oat Milk</Text>
            </View>

         {/*product rate*/}
          <View
             style={{
              marginTop:5,
              marginLeft:-SIZES.radius,
              backgroundColor:COLORS.primary2,
              flexDirection:'row',
              alignItems:'center',
              borderRadius:SIZES.radius,
              width:53,
              height:25,
              paddingHorizontal:5,
             }}
          >
            
            <StarIcon  size={15}  color={COLORS.bgDark}/>
              <Text style={{
                ...FONTS.h4,
                marginLeft:3,
                color:COLORS.lightGrey,
                fontWeight:'700'
              }}>{item.stars}</Text>  


              {/*Product Price*/}
              <View style={{
                height:30,
                width:70,
                marginLeft:175,
                borderRadius:SIZES.font,
                backgroundColor:COLORS.bgDark,
                justifyContent:'center',
                alignItems:'center' 
              }}>
              <Text
                  style={{
                     fontWeight:'600',
                     ...FONTS.h2,
                     color:COLORS.primary1
                  }}
               >${price.price}{/*{selectedOption == constants.productSize.small ? '8.00'
               :(selectedOption == constants.productSize.medium)?item.price: "22.00"}*/}</Text></View> 
          </View>
         </View>

         {/*Description*/}
         <View style={{
               marginTop:10,
         }}>
            <Text
               style={{
                  marginLeft:25,
                  ...FONTS.h2,
                  fontWeight:'600',
                  color:COLORS.bgLight
               }}
            >Description</Text>
             <Text
               style={{
                  marginLeft:30,
                  ...FONTS.body5,
                  color:COLORS.lightGrey
               }}
            >{item.desc}</Text>
         </View>
        </Animatable.View>
      )
   }


   function renderFooter(){
      return(
         <Animatable.View 
              animation='fadeInUpBig'
              duration={300}
              delay={1000}
            style={{
               marginTop:SIZES.font,
               alignItems:'center',
               flexDirection:'row',
               justifyContent:'space-between'
               
            }}
         >
            {/*Buy Now Button*/}
            <TextButton 
               label='Buy Now'
               contentContainerStyle={{
                  width:200,
                  height:50,
                  bottom:0,
                  borderRadius:SIZES.base,
                  backgroundColor:COLORS.bgDark,
                  marginLeft:10
               }}

               labelStyle={{
                  color:COLORS.primary1,
                  alignSelf:'center',
                  fontWeight:'800'
               }}

               onPress={()=>navigation.navigate('Payment')}
            />

            <View style={{bottom:15}}>

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
            <TextButton 
                 label='Add to Cart'
                 contentContainerStyle={{
                  width:140,
                  height:50,
                  borderRadius:SIZES.font,
                  backgroundColor:COLORS.bgDark,
                  marginRight:15
               }}

               labelStyle={{
                  color:COLORS.primary1,
                  alignSelf:'center',
                  fontWeight:'800'
               }}

               disabled={clicked}
               onPress={()=>{
                if(animatedX.value == 0){
                    setClicked(true)
                   scale.value = 1;
                   animatedX.value = withTiming(40,{duration:1500})
                   animatedY.value = withTiming(-540,{duration:1500})
                   setTimeout(() => {
                      scale.value = 0;
                      scale2.value = withSpring(1.5)
                      setCartCount(cartCount+1)
                      animatedX.value = withTiming(0,{duration:1500})
                      animatedY.value = withTiming(0,{duration:1500})                        
                      setTimeout(() => {
                        scale2.value = withSpring(1)

                      }, 150);
                      setClicked(false)
                    }, 1500);
                }
                addToCart(item)
              
               }}
              />
            </View>

         </Animatable.View>
      )
   }


    return(
        <View style={{
             flex:1,
             backgroundColor:COLORS.primary2
        }}>
           {/*Header*/}
           {renderHeader()}
           {/*Body*/}
           {renderBody()}
           {/*Footer*/}
           {renderFooter()}
        </View>
    )
}


ProductDetails.sharedElements = (route,otherRoute, showing)=>{
    const {item, sharedElementPrefix} = route.params
    return [
        {
            id:`${sharedElementPrefix}-ProductCard-Bg-${item?.id}`  
        }
    ]
}


const style = StyleSheet.create({
   styleSmall:{ 
      position:'absolute',
      top:50,
      bottom:0,
      right:0,
      left:-200,
   },
   styleMedium:{
       
   },
   styleLarge:{
      position:'absolute',
      top:50,
      bottom:0,
      right:0,
      left:200,
   },
   animatedView:{
      flexDirection:"row",
      alignItems:'center',
     justifyContent:"center",
     marginTop:SIZES.padding
   }
})



export default ProductDetails