import React,{useEffect} from "react";
import{
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    ScrollView
} from 'react-native'
import Animated,{
    interpolate,
    useAnimatedStyle,
    withDelay,
    withTiming
} from "react-native-reanimated";
import{
    COLORS,
    FONTS,
    SIZES,
    icons,
    images,
} from '../constants'
import IconButton from "./IconButton";
import TextButton from './TextButton';
import { useNavigation } from "@react-navigation/native";
import {useCart} from '../Context/Context';
import {useDispatch} from '../Context/Context';
import AnimatedLottieView from "lottie-react-native";


const CartModal=({ modalSharevalue1, modalSharevalue2, })=>{

  const navigation = useNavigation()
  const {cart}= useCart();
  const dispatch = useDispatch();
  const [cartCount, setCartCount]=React.useState(0);


 const Delete = (index)=>{
     dispatch({type:'DELETE', payload:index})
 }


 {/*Calculate Products quantity*/}  

 useEffect(()=>{
  let count = 0;
  cart.forEach((item)=>{
  count +=item.qty;
 });
 setCartCount(count)
})




  const modalContainerAnimatedStyle = useAnimatedStyle(
    ()=>{
        return {
            opacity:interpolate(modalSharevalue1.value,
              [SIZES.height, 0], [0,1]),
              transform:[
                {
                    translateY:modalSharevalue1.value
                }
              ],

        }
    }
  )


  const modalBgAnimatedStyle = useAnimatedStyle(()=>{
    return{
        opacity:interpolate(modalSharevalue2.
        value, [SIZES.height, 0], [0,1])
    }
  })


  const modalContentAnimatedStyle = useAnimatedStyle(
    ()=>{
        return{
            opacity:interpolate(modalSharevalue2.
            value, [SIZES.height, 0], [0,1]),
            transform:[
                {
                    translateY: modalSharevalue2.value
                }
            ]
        }
    }
  )
  


    return(
        // Main Container
        <Animated.View
          style={[{
            position:'absolute',
            bottom:0,
            height:SIZES.height,
            width:SIZES.width
          }, modalContainerAnimatedStyle]}
        >
            {/*Background Container*/}
            <Animated.View
               style={[{
                flex:1,
                height:100,
                width:SIZES.width,
                backgroundColor:COLORS.transparentBlack7
               }, modalBgAnimatedStyle]}
            >
            </Animated.View>

            {/*Modal Content*/}
            <Animated.View
               style={[{
                position:'absolute',
                bottom:9,
                height:'95%',
                width:'40%',
                left:202,
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.primary2,
               },modalContentAnimatedStyle]}
            >

              {/*Close Cart Modal*/}
              <View
                 style={{
                  marginTop:SIZES.base,
                  alignItems:'center',
                  justifyContent:'center'
                 }}
              >
                <IconButton
                    icon = {icons.shut_cart_modal}
                    iconStyle={{
                        width:60,
                        height:60,
                        tintColor:COLORS.bgDark
                     }}
                     onPress={()=>{
                      modalSharevalue2.value
                      = withTiming(SIZES.height,{
                        duration:500
                      })
                      modalSharevalue1.value
                      = withDelay(500, withTiming
                        (SIZES.height,{
                          duration:100
                        }))
                     }}
                    />
              </View>

          {(cart.length === 0) ?
             <View key='' style={{height:420,justifyContent:'center', alignItems:'center'}}>
                 <View  style={{marginBottom:50,marginTop:-120,}}>
                   <AnimatedLottieView
                        style={{height:250,}}
                        source={icons.coffeecup}
                        autoPlay
                        loop
                     />

                 </View>
               <Text style={{fontSize:15, marginTop:-70, color:COLORS.grey, fontWeight:'500'}}>Empty..</Text>
               <Text style={{fontSize:15, marginTop:SIZES.font, color:COLORS.grey60}}>Cart..!</Text>
            </View>   
           :   
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
              flexGrow:1
              }}
            >
            {/* Cart Products*/}
            {cart.map((item,index)=>
              <View
                style={{
                  height:110,
                  width:110,
                  marginTop:SIZES.radius,
                  alignSelf:'center',
                }}
              >
              
              {/*product image*/}
              <Image 
                source={item.image}
                style={{
                  width:95,
                  height:95,
                  alignSelf:'center',
                }}
              />
                {/*delete item icon*/}
                <TouchableOpacity
                 style={{
                 
                  left:40,
                  top:-110,
                  backgroundColor:COLORS.bgDark,
                  width:30,
                  height:28,
                  borderRadius:40,
                  alignItems:'center',
                  justifyContent:'center'
                 }}
                 onPress={()=>Delete(item)}
                >
                    <IconButton 
                      icon={icons.close}
                      iconStyle={{
                        width:20,
                        height:20,
                        tintColor:COLORS.dark,
                       
                      }}
                    
                    />
              </TouchableOpacity>
              </View>
              )
            }     
            </ScrollView>
          } 
          {/*total*/}
            <View
              style={{
                height:140,
                marginTop:10,
                alignItems:'center',
                justifyContent:'center',
                
              }}
            >
              <Text style={{
                 ...FONTS.h2,
                 fontWeight:'500',
                 color:COLORS.bgDark,
                 marginTop:-90
              }}>
                Total:
              </Text>
              <View style={{flexDirection:'row',marginTop:SIZES.base}}>
                 <View style={{
                       height:20,
                       width:20, 
                       backgroundColor:COLORS.primary,
                       justifyContent:'center',
                       alignItems:'center',
                       borderRadius:SIZES.radius,
                       marginHorizontal:SIZES.base
                       }}>
                   <Text style={{
                    ...FONTS.h4,
                    fontWeight:'500',
                    color:COLORS.bgDark,
                    }}>
                {cartCount}
              </Text>
                 </View>
              <Text style={{
                 ...FONTS.h4,
                 fontWeight:'500',
                 color:COLORS.bgDark,
                 
              }}>
                items
              </Text>
              </View>
            </View>

              

          {/*Button*/}
           <View
              style={{
                alignItems:'center',
              }}
           >
             <TextButton
              contentContainerStyle={{
                height: 50,
                width:70,
                borderRadius: SIZES.radius,
                backgroundColor:COLORS.bgDark,
                marginTop:-70
                  
            }}
            icon={icons.arrow_right}
            imgSyle={{
                width:30,
                height:30,
                marginTop:15,
                marginLeft:5,
                
            }}
            onPress={()=>navigation.navigate("Cart")}
            />

           </View>
            

            </Animated.View>

        </Animated.View>
    )
}


export default CartModal;


