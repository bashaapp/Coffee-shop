import React, { useEffect,useState } from "react";
import{
    View,
    Text,
    Image,
    TouchableOpacity

} from 'react-native'
import{
    COLORS,
    SIZES,
    FONTS,
    icons
} from '../constants'
import{
    useSharedValue,
    withTiming,
    withDelay
  } from "react-native-reanimated";
import CartModal from "../component/CartModal";
import Tabs from "../navigation/Tabs";
import { useCart } from '../Context/Context';


  


const MainScreen = ({})=>{

  const {cart} = useCart();
  const [cartCount, setCartCount]=React.useState(0);
  const [dark, setDark] = useState(false)
  

{/*Calculate Products quantity*/}  

   useEffect(()=>{
      let count = 0;
      cart.forEach((item)=>{
      count +=item.qty;
     });
     setCartCount(count)
 })


  // Animation
  const modalSharevalue1 = useSharedValue(SIZES.height)
  const modalSharevalue2 = useSharedValue(SIZES.height)
  

 
  

    // Render
    function renderHeader(){
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
                {/*menuIcon*/}
                <TouchableOpacity
                  onPress={()=>{}}
                >
                    <Image 
                       source={icons.menu}
                       style={{
                           width:20,
                           height:20,
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
                >Coffee Shop</Text>

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
                       onPress={()=>{
                        modalSharevalue1.value
                        = withTiming(0,{
                          duration:100,
                        })
                        modalSharevalue2.value
                        = withDelay(100,
                          withTiming(0,{
                            duration:500
                          }))
                      }}
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

          
            </View>
        )
    }

    return(
        <View
         style={{flex:1,}}
        >
            {/*renderHeader*/}
            {renderHeader()}

             {/*render Tabs*/}
             <Tabs />
             
              {/*renderCartModal*/}
              <CartModal
              modalSharevalue1={modalSharevalue1}
              modalSharevalue2={modalSharevalue2}
             />

        </View>
    )
}


export default MainScreen;