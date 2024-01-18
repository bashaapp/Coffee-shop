import React from 'react'
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native'
import { COLORS, FONTS, icons, SIZES,images, dummyData, constants } from '../constants';
import * as Progress from 'react-native-progress';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {utils} from '../utils'


const Delivery = ({navigation})=>{

    const mapView = React.useRef();
    const [region,setRegion] =React.useState(null)
    const [toLoc,setToLoc] =React.useState(null)
    const [fromLoc,setFromLoc] =React.useState(null)
    const [angle,setAngle] =React.useState(null)
    const [isReady,setIsReady] = React.useState(false)
    const [duration,setDuration] = React.useState('')



    React.useEffect(()=>{
        let initialRegion ={
            latitude:1.5496614931250685,
            longitude:110.36381866919922,
            latitudeDelta:0.02,
            longitudeDelta:0.02
        }

        let destination={
            latitude:1.5496614931250685,
            longitude:110.36381866919922,
        }
       

        setToLoc(destination)
        setFromLoc(dummyData.fromLocs[1])
        setRegion(initialRegion)
   
    },[])





    const renderHeader=()=>{

        return (
          <View style={{
            flex:1
          }}>
            <View style={{
                flexDirection:'row',
                marginTop:SIZES.padding_11,
                marginHorizontal:SIZES.base_1,
                justifyContent:'space-between',
                alignItems:'center'
        }}> 

          {/*Close Button*/}
            <TouchableOpacity
                onPress={()=>navigation.navigate('Home')}
            >
              <Image 
                source={icons.cross}
                style={{
                    height:25,
                    width:25,
                    tintColor:COLORS.bgDark
                }}
              />  
            </TouchableOpacity>

            <Text style={{
                fontWeight:'bold',
                color:COLORS.bgDark
            }}>Order Help</Text>
        </View>


        {/*timing arrive*/}
        <View style={{
            height:"63%",
            width:'95%',
            marginTop:SIZES.base_1,
            alignSelf:'center',
            borderRadius:SIZES.radius_1,
            backgroundColor:COLORS.gray,
        }}>
         <View  style={{
            flexDirection:'row',
            justifyContent:'space-between',
            marginHorizontal:SIZES.base_1,
            marginTop:SIZES.base_1
         }}>
            <View style={{
                 marginTop:SIZES.base_1
            }}>
               <Text style={{
                   ...FONTS.body4,
                   color:COLORS.bgDark,
                   fontWeight:'600'
                 }}>Estimated Arrival</Text>
               <Text style={{
                   fontSize:SIZES.h2,
                   color:COLORS.darkColor,
                   fontWeight:'bold'
                }}>35-40 Minutes</Text>
           </View>

             <Image 
              source={images.hot_delivery}
              resizeMode="stretch"
              style={{
                height:70,
                width:"22%",
                marginRight:SIZES.padding_1,
              }}
             />
         </View>

         {/*progress Bar*/}
        <View style={{
            marginHorizontal:SIZES.base_1,
            marginTop:-SIZES.base_1
        }}>
            <Progress.Bar 
             size={30} 
             color={COLORS.bgDark}
             indeterminate={true}
           />

           <Text style={{
              marginTop:SIZES.base_1,
            ...FONTS.body3,
            color:COLORS.darkColor,
           }}>Your order at Julio's is being prepared</Text>
        </View>
       </View>
     </View>
        )
    }

     

    const renderMap=()=>{
        return(
            <MapView 
              ref={mapView}
              style={{
                flex:1
              }}

              provider={PROVIDER_GOOGLE}
              initialRegion={region}
            >
              {
                fromLoc && 
                <Marker 
                key={'FromLoc'}
                coordinate={fromLoc}
                tracksViewChanges={false}
                icon={icons.navigator}
                rotation={angle}
                anchor={{x:0.5, y:0.5}}
                />
                
              } 
               {
                toLoc && 
                <Marker 
                key={'ToLoc'}
                coordinate={toLoc}
                tracksViewChanges={false}
                icon={icons.location}
                anchor={{x:0.5, y:0.5}}
                />
                
              } 

              <MapViewDirections
               origin={fromLoc}
               destination={toLoc}
               apikey={constants.GOOGLE_MAP_API_KEY}
               strokeWidth={5}
               strokeColor={COLORS.primary}
               optimizeWaypoints={true}
               onReady={result=>{
                setDuration(Math.ceil(result.duration))
                  

                if(!isReady) {
                    mapView.current.fitToCoordinates(result.coordinates,
                        {
                            edgePadding:{
                        right:SIZES.width * 0.1,
                        bottom:400,
                        left:SIZES.width * 0.1,
                        top:SIZES.height * 0.1
                    }
                })
                    //Resposition the navigator
               if(result.coordinates.length >=2){

                let angle = utils.calculateAngle
                (result.coordinates)
                setAngle(angle)
               }
               setIsReady(true)
                }
               }}

           
              />

              

            </MapView>
        )
    }



    const renderInfo=()=>{
        return(
            <View
            style={{
                position:'absolute',
                bottom:0,
                width:'100%'
            }}
            >
                <View
                  style={{
                    padding:SIZES.padding_11,
                    borderTopLeftRadius:30,
                    borderTopRightRadius:30,
                    backgroundColor:COLORS.primary2
                  }}
                >
                    {/*Delivery Man Details*/}
                    <TouchableOpacity
                        style={{
                            flexDirection:'row',
                            height:70,
                            marginTop:SIZES.padding_11,
                            borderRadius:SIZES.radius_1,
                            paddingHorizontal:SIZES.radius_1,
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:COLORS.gray,
                        }}
                    >
                        <Image 
                          source={images.delivery}
                          style={{
                            width:40,
                            height:40,
                            borderRadius:SIZES.base_1,
                          }}
                        
                        />
                        <View
                         style={{
                            flex:1,
                            marginLeft:SIZES.radius_1
                         }}
                        >
                            <Text
                                 style={{
                                    color:COLORS.darkColor,
                                    ...FONTS.h3,
                                    fontWeight:'700'
                                 }}
                            >Bin Salman</Text>
                            <Text
                                 style={{
                                    color:COLORS.darkColor,
                                    ...FONTS.body3,
                                    fontWeight:'500'
                                 }}
                            >Delivery Man</Text>
                        </View>
                        <View
                           style={{
                            height:40,
                            width:40,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:7,
                            borderWidth:1.5,
                            borderColor:COLORS.bgDark,
                           }}
                        >

                            <Image 
                               source={icons.call}
                               style={{
                                width:30,
                                height:30,
                                tintColor:COLORS.bgDark
                               }}
                            
                            />

                        </View>

                    </TouchableOpacity>

                </View>

            </View>
        )
    }
     



    return (
       <View  style={{
        flex:1,
        backgroundColor:COLORS.primary2,
       }}
       >
    <SafeAreaView
       style={{
          height:"30%",
       
       }}
       >
        {/*Header*/}
        {renderHeader()}
    </SafeAreaView>

          {/*renderMap*/}
          {renderMap()}

          {/*rednerInfo*/}
          {renderInfo()}
       </View>

      
       
    )
}


export default Delivery;