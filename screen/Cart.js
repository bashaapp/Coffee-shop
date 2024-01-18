import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from 'react-native'
import{ COLORS,FONTS,SIZES,icons,images } from '../constants'
import {IconButton, TextButton} from '../component'
import {useCart} from '../Context/Context';
import {useDispatch} from '../Context/Context';
import AnimatedLottieView from "lottie-react-native";



const Cart=({navigation})=>{

  const {cart}= useCart();
  const dispatch = useDispatch();


  const Clear = (index) => {
    dispatch({ type: "CLEAR", index });
  };
 const Delete = (index)=>{
     dispatch({type:'DELETE', payload:index})
 }
 const  Increase = (id,qty) => {
     dispatch({ type: "INCREASE", payLoad: id,qty });
   };
   const Decrease = (id,qty) => {
     dispatch({ type: "DECREASE", payLoad: id,qty });
   };
 
 const [totalPrice, setTotalPrice] = React.useState(0);
 const [totalItems, setTotalItems] = React.useState(0);

React.useEffect(() => {
 let items = 0;
 let price = 0;

 cart.forEach((item) => {
   items += item.qty;
   price += item.qty * item.price;
 });

 setTotalItems(items);
 setTotalPrice(price);
},);


//Alert Message to Detlet item
const RemoveItem = (item) => {
    Alert.alert ('Delete Product','Are You Sure to Delete This Product?',
      [
        {
          text: 'No',
          onPress: () => {
            console.log('Yes Pressed')
          }
        },
        {
          text: 'Yes',
          onPress: () => {
             Delete(item)
          }
        },
      ]
    )
}
    // Render
     function renderHeader(){
        return(
            <View
               style={{
                marginTop:SIZES.padding,
                marginBottom:SIZES.font
               }}
            >
            <View
               style={{
                flexDirection:'row',
                justifyContent:'space-between',
                marginHorizontal:SIZES.radius
               }}
            >              
            {/*back icon*/}
            <TouchableOpacity  
            style={{
               width:30,
               height:30,
               backgroundColor:COLORS.bgDark,
               justifyContent:'center',
               alignItems:'center',
               borderRadius:SIZES.base
            }}
              onPress={()=>navigation.goBack()}
            >
                <Image 
                  source={icons.back_arrow}
                  style={{
                    width:25,
                    height:25,
                    tintColor:COLORS.dark
                  }}
                />
            </TouchableOpacity>

              {/*title*/}
                <Text
                  style={{
                    color:COLORS.bgDark,
                    ...FONTS.h2,
                    fontWeight:'500',
                   // left:130
                  }}
                >Cart
                </Text>

              {/*delete icon*/}
                  <TouchableOpacity onPress={(item)=>Clear(item)}
                  >
                    <Image 
                        source={icons.delet}
                        style={{
                           width:25,
                           height:25,
                           tintColor:COLORS.bgDark
                           }}
                       />
                  </TouchableOpacity>
                </View>
            </View>
        )
    }


    function renderCard(){
        return(
           <View
             style={{
               // flex:1,
               bottom:15,
             }}
           >

        {(cart.length === 0) ?
             <View style={{height:500,justifyContent:'center', alignItems:'center'}}>
                 <View  style={{marginBottom:50,marginTop:-120,}}>
                   <AnimatedLottieView
                        style={{height:300,}}
                        source={icons.coffeecup}
                        autoPlay
                        loop
                     />

                 </View>
               <Text style={{fontSize:15, marginTop:-90, color:COLORS.grey, fontWeight:'bold'}}>Get your favourite Coffee easily</Text>
               <Text style={{fontSize:12, marginTop:SIZES.font, color:COLORS.grey60}}>Just add the items you would & place your order here.</Text>
            </View>   
           : 

           <View style={{height:500}}> 
              {/*Card Container*/}
              <ScrollView contentContainerStyle={{
                flexGrow:1,
                marginTop:25,
                paddingBottom:30,
                backgroundColor:COLORS.black
              }}
            >
           <View>{cart.map((item, index) => (         
           <View key={item.id}
           style={{
           marginHorizontal:SIZES.margin,
           height:115,
           width:'94%',
           marginBottom:6,
           borderRadius:SIZES.radius,
           backgroundColor:COLORS.primary2,
           alignSelf:'center',
           flexDirection:'row',
           shadowColor: COLORS.bgDark,
           shadowOffset: {
           width: 0,
           height: 3,
           },
           shadowOpacity: 0.20,
           shadowRadius: 1.49,
           elevation: 20,
           }}
           >  
           <View  style={{
           backgroundColor:COLORS.primary2,
           height:93,
           width:95,
           left:10,
           marginTop:15,
           marginBottom:7,
           alignItems:'center',
           justifyContent:'center',
           borderRadius:SIZES.radius,
           shadowColor: COLORS.bgDark,
           shadowOffset: {
            width:0,
            height: 3,
          },
          shadowOpacity: 0.250,
          shadowRadius: 5.60,
          elevation: 20,
           }}>
           <Image 
           source={item.image}
           resizeMode="contain"
           style={{
             width:88,
             height:88,
           }}
           />      
           </View>  
           
           <View style={{
           marginTop:SIZES.font,
           marginLeft:20,
           width:200
           }}>
           <Text 
           style={{
            fontSize:SIZES.radius,color:COLORS.gray, fontWeight:'700'}}>{item.name}
           </Text>

           {/*quantity*/}
          <View style={{
              backgroundColor:COLORS.primary2,
              width:65,
              height:25,
              marginTop:5,
              justifyContent:'center',
              alignItems:'center',
              marginLeft:20,
              borderRadius:10,
              shadowColor: COLORS.bgDark,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 5.60,
              elevation: 20,
          }}>
          <Text 
           style={{
            fontSize:SIZES.radius,color:COLORS.grey80, fontWeight:'400',
            }}>Qty: {item.qty}
           </Text>
          </View>
           
           {/*Increase & Decrease Button*/}

           <View style={{
            flexDirection:'row',
            marginTop:10,
            padding:2,
            left:3
           }}>
           <TouchableOpacity onPress={()=>Decrease(item)}
              style={{
                //Decrease
                height:33,
                width:33,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:COLORS.primary2,
                borderRadius:SIZES.base,
                borderBottomRightRadius:30,
                shadowColor: COLORS.bgDark,
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.50,
                shadowRadius: 5.60,
                elevation: 20,
              }}
           >
            <Text style={{
              ...FONTS.h3,
              color:COLORS.white,
              fontWeight:'700'
            }}>-</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>Increase(item)}
              style={{
                //Increase
                height:33,
                width:33,
                left:20,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:COLORS.primary2,
                borderRadius:SIZES.base,
                borderBottomLeftRadius:30,
                shadowColor: COLORS.bgDark,
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.50,
                shadowRadius: 5.60,
                elevation: 20,
              }}
           >
            <Text style={{
              ...FONTS.h3,
              color:COLORS.white,
              fontWeight:'700'
            }}>+</Text>
           </TouchableOpacity>
           </View>
           </View> 
           
           <TouchableOpacity onPress={() => RemoveItem(item)}
           style={{
           height:35,
           width:60,
           marginTop:40,
           borderRadius:4,
           backgroundColor:COLORS.primary2,
           right:25,
           justifyContent:'center',
           alignItems:'center',
           shadowColor: COLORS.bgDark,
           shadowOffset: {
             width: 0,
             height: 5,
           },
           shadowOpacity: 0.20,
           shadowRadius: 5.60,
           elevation: 20,
           borderBottomLeftRadius:70,
           borderTopLeftRadius:20
           }}>
           
           <Image 
              source={icons.delet}
              style={{height:25,width:25, tintColor:COLORS.bgDark,left:5}}
           />
           
           </TouchableOpacity>
            
           </View>    
           ))}       
            </View>
            </ScrollView>
           </View> 
          }
        </View>

           

           

        )
    }


    function renderFooter(){
      return(
        <View
          style={{
            bottom:40,
            width:'80%',
            height:50,
            alignSelf:'center',
            marginTop:SIZES.margin,
            backgroundColor:COLORS.primary2,
            shadowColor: COLORS.bgDark,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            elevation: 20,
            borderRadius:SIZES.padding,
            paddingHorizontal:30

          }}
        >
         
          {/*checkout*/}
             <View
               style={{
                borderRadius:40,
                width:'64%',
                height:50,
                marginHorizontal:115,
                backgroundColor:COLORS.primary2,
              
               
               }}
             >
               <TextButton 
                 label='Checkout'
                  contentContainerStyle={{
                    borderRadius:40,
                    width:'90%',
                    height:40,
                    marginTop:5,
                    marginHorizontal:10,
                    backgroundColor:COLORS.primary2,
                    shadowColor: COLORS.bgDark,
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,
                    elevation: 20,
                  }}
                  labelStyle={{
                    color:COLORS.bgDark,
                    ...FONTS.h2,
                    fontWeight:'bold'
                  }}

                  onPress={()=>navigation.navigate('Payment')}
               />
              
             </View>


          {/*total*/}
             <View style={{
                marginTop:-38,
                marginHorizontal:-SIZES.radius,
                flexDirection:'row'
             }}>
                  <Text style={{
                  fontSize:20,
                 fontWeight:'bold',
                 color:COLORS.bgDark,
             }}>Total:</Text>
              <Text style={{
                 fontSize:20,
                 fontWeight:'bold',
                 paddingHorizontal:5,
                 color:COLORS.primary,
             }}>${totalPrice.toFixed(2)}</Text>
           </View>

             
            
        </View>
      )
    }






    return(
        <View style={{
            flex:1,
            backgroundColor:COLORS.black
        }}>
           {/*render Header*/}
         

           {/*render Card*/}
           {renderCard()}

           {/*render footer*/}
           {renderFooter()}
        </View>
    )
}


export default Cart;