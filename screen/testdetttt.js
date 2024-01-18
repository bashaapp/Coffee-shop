import React, {useContext,useEffect, useRef, useState } from "react";
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated
} from 'react-native';

import { COLORS, FONTS, SIZES, constants, icons, images } from "../constants";
import { SharedElement } from "react-native-shared-element";
import { ImageBackground } from "react-native";
import {TextButton} from '../component'
import { StarIcon } from "react-native-heroicons/solid";
import * as Animatable from 'react-native-animatable';
import { useDispatch } from "../Context/Context";
import { useCart } from '../Context/Context';




const ProductDetails =({navigation, route})=>{


   const [restaurant, setRestaurant] = React.useState(null)

   // State
   const {item, data,sharedElementPrefix} = route.params
   const opacity = useRef(new Animated.Value(0)).current;
   const imageRef = useRef(null)

     {/*Change Basket Value*/}
   const {cart} = useCart();
   const [cartCount, setCartCount]=React.useState(0);
   const [dark, setDark] = useState(false)
   const [price, setPrice] = useState(restaurant.prices[0])
  
  
   useEffect(()=>{
         let count = 0;
         cart.forEach((item)=>{
         count +=item.qty;
        });
        setCartCount(count)
      
    })
   
    
       {/*Add Item to Cart*/}
   const dispatch = useDispatch();
   const addToCart = (item)=>{
          dispatch({type:'ADD', payload:item});
      }

     // let {item} = route.params;

   {/*Product Animation */} 
   useEffect(()=>{
      Animated.timing(opacity,{
         toValue:1,
         duration:300,
         delay:3300,
         useNativeDriver:false,

      }).start();
     
      setRestaurant(item)
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
                    <Text
                       style={{
                           fontSize:15,
                           fontWeight:'bold',
                           color:COLORS.white
                       }}
                    >{cartCount}</Text>
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
              id={`${sharedElementPrefix}-ProductCard-Bg-${restaurant?.id}`}
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
               >{restaurant?.name}</Text>

                <Text
                  style={{
                     marginTop:SIZES.font,
                     fontWeight:'600',
                     marginRight:-SIZES.margin,
                     ...FONTS.h2,
                     color:COLORS.primary
                  }}
               >${price.price}{/*{selectedOption == constants.productSize.small ? '8.00'
               :(selectedOption == constants.productSize.medium)?item.price: "22.00"}*/}</Text>

            </View>

            <View
               style={{
                  marginTop:5,
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
              marginTop:10,
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

              <TextButton 
                 label='Add to Cart'
                 contentContainerStyle={{
                     width:120,
                     height:40,
                     marginLeft:130,
                     borderRadius:SIZES.font,
                     backgroundColor:COLORS.bgDark                 
                 }}
                 labelStyle={{
                    color:COLORS.primary1,
                    fontWeight:'500',
                 }}

                 onPress={()=>addToCart(restaurant)}
              
              />
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
               marginTop:SIZES.margin,
               alignItems:'center',
               
            }}
         >
            <TextButton 
               label='Buy Now'
               contentContainerStyle={{
                  width:300,
                  height:50,
                  borderRadius:SIZES.radius,
                  backgroundColor:COLORS.bgDark
               }}

               labelStyle={{
                  color:COLORS.primary1,
                  alignSelf:'center',
                  fontWeight:'800'
               }}
               
               onPress={()=>navigation.navigate('Payment')}
            
            />

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
   }
})



export default ProductDetails