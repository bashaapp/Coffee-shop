import React from "react";
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { COLORS, SIZES, images, FONTS, icons } from "../constants";
import { Path, Svg } from "react-native-svg";



const Profile = () => {

    const controlX = SIZES.width /2



    function renderHeader () {
        return (
            <View style={{
                flex:1,
                
            }}>
              {/*Cure Section*/}   
            <View style={{
                flex:1,
                backgroundColor:COLORS.bgDark,
            }}>

                {/*Curve*/}
                <Svg
                   style={{
                    position:'absolute',
                    top:100
                   }}
                   width={SIZES.width}
                   height={100}
                >
                    <Path
                     d={`M 0 20 Q ${controlX} 130 ${SIZES.width}
                     20 L ${SIZES.width} 100 L 0 100 Z
                     `}
                     fill={COLORS.black}
                    />
                    
                </Svg>
            </View>

            
            {/*User Details*/}
            <View style={{
                flex:2,
                backgroundColor:COLORS.black,
            }}>
               <View style={{ 
                    top:-70,
                    justifyContent:'center',
                    alignItems:'center'
                    }}>
                 {/*Profile Photo*/}
                 <Image 
                  source={images.delivery}
                  resizeMode="contain"
                  style={{
                    width:100,
                    height:100,
                    borderRadius:50, 
                    borderWidth:2,
                    borderColor:COLORS.black,
                  }}
                />

                {/*Edit Photo Button*/}
                <TouchableOpacity
                    style={{
                        height:26,
                        width:26,
                        borderRadius:40,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:COLORS.bgDark,
                        position:'absolute',
                        top:65,
                        right:135,
                        borderWidth:0.9,
                        borderColor:COLORS.gray2
                    }}
                >
                    <Text style={{
                        color:COLORS.gray2,
                        fontWeight:'700',
                        fontSize:SIZES.h3
                    }}>+</Text>
                </TouchableOpacity>
                {/*Name*/}
                <Text style={{
                    marginTop:SIZES.font,
                    ...FONTS.h3,
                    color:COLORS.gray2,
                    fontWeight:'700'
                }}>Ahmed Saleh</Text>
               </View>

               {/*Edit & Share profile Button*/}
               <View
                  style={{
                    flexDirection:'row',
                    marginTop:-45,
                    justifyContent:'center',
                    alignItems:'center',
                  }}
               >
                {/*Edit profile*/}
                <TouchableOpacity
                   style={{
                     height:40,
                     width:'40%',
                     borderRadius:10,
                     backgroundColor:COLORS.bgDark,
                     justifyContent:'center',
                     alignItems:'center',
                 
                   }}
                >

                    <Text style={{
                        ...FONTS.body3,
                        fontWeight:'800',
                        color:COLORS.gray2
                    }}>Edit Profile</Text>

                </TouchableOpacity>

                {/*Share Profile*/}
                <TouchableOpacity
                   style={{
                     height:40,
                     width:'40%',
                     borderRadius:10,
                     backgroundColor:COLORS.bgDark,
                     justifyContent:'center',
                     alignItems:'center',
                     marginLeft:5
                 
                   }}
                >

                    <Text style={{
                        ...FONTS.body3,
                        fontWeight:'800',
                        color:COLORS.gray2
                    }}>Share Profile</Text>

                </TouchableOpacity>

                <TouchableOpacity
                   style={{
                     height:40,
                     width:'11%',
                     borderRadius:10,
                     backgroundColor:COLORS.bgDark,
                     justifyContent:'center',
                     alignItems:'center',
                     marginLeft:5
                 
                   }}
                >

                    <Image
                       source={icons.person2}
                       resizeMode="contain"
                       style={{
                        height:25,
                        width:25,
                        tintColor:COLORS.gray2
                       }}
                    />

                </TouchableOpacity>

               </View>
            </View>

          

            </View>
        )
    }


    function renderBody () {
        return (
            <View style={{
                position:'absolute',
                top:'60%',
                width:'100%',
                alignSelf:'center'
            }}>
              
            {/*Wallet Button*/}
             <ScrollView style={{
                height:200,
                bottom:5
             }}>
             <TouchableOpacity onPress={()=>{}}
              style={{
                height:40,
                width:'90%',
               // marginTop:7,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginLeft:10,
                backgroundColor:COLORS.grey20,
                borderRadius:10
            
            }}
            >
              <View style={{
                flexDirection:'row',
                marginLeft:10
              }}>
              <Image source={icons.wallet}
              resizeMode="contain"
              style={{
                width:20,
                height:20,
               // tintColor:dark ? COLORS.darkColor: COLORS.black,
                marginRight:10,
                top:3
              }}
              />
              <Text style={{ 
                fontSize:SIZES.h3,
                color:COLORS.gray2
                }}>Wallet</Text>
                </View> 

                  <Image 
                  source={icons.right_arrow}
                  style={{
                    height:20,
                    width:20,
                    tintColor:COLORS.black,
                    marginRight:10,
                  }}
                  />
                
            </TouchableOpacity> 

            {/*Coupon*/}
             <TouchableOpacity onPress={()=>{}}
              style={{
                height:40,
                width:'90%',
                marginTop:4,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginLeft:10,
                backgroundColor:COLORS.grey20,
                borderRadius:10
            
            }}
            >
              <View style={{
                flexDirection:'row',
                marginLeft:10
              }}>
              <Image source={icons.coupon}
              resizeMode="contain"
              style={{
                width:20,
                height:20,
               // tintColor:dark ? COLORS.darkColor: COLORS.black,
                marginRight:10,
                top:3
              }}
              />
              <Text style={{ 
                fontSize:SIZES.h3,
                color:COLORS.gray2
                }}>Coupon</Text>
                </View> 

                  <Image 
                  source={icons.right_arrow}
                  style={{
                    height:20,
                    width:20,
                    tintColor:COLORS.black,
                    marginRight:10,
                  }}
                  />
                
            </TouchableOpacity> 

            {/*Location*/}
            <TouchableOpacity onPress={()=>{}}
              style={{
                height:40,
                width:'90%',
                marginTop:4,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginLeft:10,
                backgroundColor:COLORS.grey20,
                borderRadius:10
            
            }}
            >
              <View style={{
                flexDirection:'row',
                marginLeft:10
              }}>
              <Image source={icons.location}
              resizeMode="contain"
              style={{
                width:20,
                height:20,
               // tintColor:dark ? COLORS.darkColor: COLORS.black,
                marginRight:10,
                top:3
              }}
              />
              <Text style={{ 
                fontSize:SIZES.h3,
                color:COLORS.gray2
                }}>Location</Text>
                </View> 

                  <Image 
                  source={icons.right_arrow}
                  style={{
                    height:20,
                    width:20,
                    tintColor:COLORS.black,
                    marginRight:10,
                  }}
                  />
                
            </TouchableOpacity>  

            {/*Account*/}     
            <TouchableOpacity onPress={()=>{}}
              style={{
                height:40,
                width:'90%',
                marginTop:4,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginLeft:10,
                backgroundColor:COLORS.grey20,
                borderRadius:10
            
            }}
            >
              <View style={{
                flexDirection:'row',
                marginLeft:10
              }}>
              <Image source={icons.key}
              resizeMode="contain"
              style={{
                width:20,
                height:20,
                tintColor:COLORS.white,
                marginRight:10,
                top:3
              }}
              />
              <Text style={{ 
                fontSize:SIZES.h3,
                color:COLORS.gray2
                }}>Account</Text>
                </View> 

                  <Image 
                  source={icons.right_arrow}
                  style={{
                    height:20,
                    width:20,
                    tintColor:COLORS.black,
                    marginRight:10,
                  }}
                  />
                
            </TouchableOpacity>   
                
               {/*Help Center*/}
            <TouchableOpacity onPress={()=>{}}
              style={{
                height:40,
                width:'90%',
                marginTop:4,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginLeft:10,
                backgroundColor:COLORS.grey20,
                borderRadius:10
            
            }}
            >
              <View style={{
                flexDirection:'row',
                marginLeft:10
              }}>
              <Image source={icons.help}
              resizeMode="contain"
              style={{
                width:20,
                height:20,
               // tintColor:dark ? COLORS.darkColor: COLORS.black,
                marginRight:10,
                top:3
              }}
              />
              <Text style={{ 
                fontSize:SIZES.h3,
                color:COLORS.gray2
                }}>Help Center</Text>
                </View> 

                  <Image 
                  source={icons.right_arrow}
                  style={{
                    height:20,
                    width:20,
                    tintColor:COLORS.black,
                    marginRight:10,
                  }}
                  />
                
            </TouchableOpacity> 

            {/*Setting*/}
            <TouchableOpacity onPress={()=>{}}
              style={{
                height:40,
                width:'90%',
                marginTop:4,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginLeft:10,
                backgroundColor:COLORS.grey20,
                borderRadius:10
            
            }}
            >
              <View style={{
                flexDirection:'row',
                marginLeft:10
              }}>
              <Image source={icons.setting}
              resizeMode="contain"
              style={{
                width:20,
                height:20,
               // tintColor:dark ? COLORS.darkColor: COLORS.black,
                marginRight:10,
                top:3
              }}
              />
              <Text style={{ 
                fontSize:SIZES.h3,
                color:COLORS.gray2
                }}>Settings</Text>
                </View> 

                  <Image 
                  source={icons.right_arrow}
                  style={{
                    height:20,
                    width:20,
                    tintColor:COLORS.black,
                    marginRight:10,
                  }}
                  />
                
            </TouchableOpacity> 
             </ScrollView>
            </View>
        )
    }


    return (
        <View style={{
            flex:1,
            backgroundColor:COLORS.black,
        }}>
           {/*renderHeader*/}
           {renderHeader()}
           {/*renderBody*/}
           {renderBody()}
        </View>
    )
}




export default Profile;

