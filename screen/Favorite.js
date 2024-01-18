import React from "react";
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from 'react-native'
import {useDispatch} from '../Context/Context';
import {useCart} from '../Context/Context';
import{ COLORS,SIZES,FONTS, icons} from '../constants'


const Faviroute =()=>{
    const { favorites, products } = useCart();
    const dispatch = useDispatch();
  
    const unfavorite = (product) => {
      dispatch({
        type: "DELETE_FAVORITE_PRODUCT",
        payload: { product }, // <-- pass product in payload
      });
    };

  
  const UnfavoriteProduct = (item) => {
      Alert.alert ('Unfavorite?', 'Are you sure to unfavorite?',
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
             unfavorite(item)
          }
        },
      ]
      
      )
  }

 
 
    return(
         <View
             style={{
                flex:1,
             }}
           >

           {!favorites.length ? (
             <View style={{ flex:1, backgroundColor:COLORS.black,justifyContent:'center', alignItems:'center'}}>
               
               <Text style={{fontSize:15, marginTop:-90, color:COLORS.grey, fontWeight:'bold'}}>Your favorite list is Empty..!</Text>
               <Text style={{fontSize:12, marginTop:SIZES.font, color:COLORS.grey60}}>Just add your favorite product you would order again.</Text>
            </View>   
           ):(

           <View style={{flex:1,}}> 
              {/*Card Container*/}
              <ScrollView 
                 contentContainerStyle={{
                 flexGrow:1,
                 paddingTop:10,
                 backgroundColor:COLORS.black
                }}
            >
           <View>
           {favorites.map((product) => (         
           <View key={product.id}
               style={{
                 marginHorizontal:SIZES.margin,
                 height:100,
                 width:'83%',
                 marginBottom:6,
                 borderTopLeftRadius:50,
                 borderBottomRightRadius:50,
                 backgroundColor:COLORS.primary2,
                 alignSelf:'center',
                 flexDirection:'row',
                 shadowColor: COLORS.bgDark,
                 shadowOffset: {
	                  width: 0,
	                  height: 5,
                    },
                    shadowOpacity: 0.37,
                    shadowRadius: 7.49,
                    elevation: 20,
               }}
           >  
            <View  style={{
                   backgroundColor:COLORS.primary2,
                   height:90,
                   width:90,
                   left:10,
                   marginTop:5,
                   marginBottom:7,
                   alignItems:'center',
                   justifyContent:'center',
                   borderRadius:SIZES.radius,
            }}>
              <Image 
                  source={product.image}
                  resizeMode="contain"
                  style={{
                      width:80,
                      height:85,
                  }}
              />      
            </View>  
              
               <View style={{
                   marginTop:SIZES.font,
                   marginLeft:SIZES.font,
                   width:200
               }}>
                 <Text 
                  style={{
                     fontSize:SIZES.radius,color:COLORS.bgDark, fontWeight:'700'}}>{product.name}
                </Text>
                 <Text
                   numberOfLines={5}
                    style={{
                        color:COLORS.gray,
                        
                    }}
                 >{product.desc}</Text>
                </View> 

                <TouchableOpacity onPress={() =>  UnfavoriteProduct(product)}
                style={{
                    height:25,
                    width:25,
                    marginTop:8,
                    borderRadius:4,
                    backgroundColor:COLORS.grey20,
                    right:27,
                    justifyContent:'center',
                    alignItems:'center',
                }}>

                    <Image 
                       source={icons.love}
                       style={{height:15,width:15}}
                    />

                </TouchableOpacity>
                     
           </View>       
           ))}       
           </View>
            </ScrollView>
           </View>
            
            )}
    
           </View>
    )
}



export default Faviroute;