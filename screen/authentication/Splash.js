import React from "react";
import{
    View,
    Text,
    Image
} from 'react-native'

import{
    COLORS,
    SIZES,
    FONTS,
    images,
    icons
} from '../../constants'
import {TextButton} from "../../component";
import * as Animatable from 'react-native-animatable';


const Splash =({navigation})=>{


    // Render
    function renderLogo(){
        return(
            <View
                style={{
                    marginTop:70,
                    alignItems:'center'
                }}
            >
            <Animatable.View
                 animation='fadeIn'
                 duration={500}
                 delay={1500}
            >
                <Image
                  source={icons.logooo}
                  resizeMode="contain"
                  style={{
                    width:250,
                    height:250,
                    tintColor:COLORS.bgDark
                  }}
                />

              </Animatable.View>


              <Animatable.View
                 animation='fadeIn'
                 duration={600}
                 delay={2000}
            >
                
                <Text style={{
                    marginTop:SIZES.padding,
                    ...FONTS.h1,
                    color:COLORS.lightGrey60
                }}>
                    Find your favorite
                </Text>

                </Animatable.View>

                <Animatable.View
                 animation='fadeIn'
                 duration={600}
                 delay={2500}
            >

                <Text style={{
                    marginTop:SIZES.font,
                    ...FONTS.h1,
                    fontWeight:'bold',
                    color:COLORS.bgLight
                }}>
                    Coffee Taste!
                </Text>

                </Animatable.View>

                {/*Button*/}
                <Animatable.View
                 animation='fadeIn'
                 duration={600}
                 delay={2500}
                   style={{
                     marginTop:100, 
                   }}
                >
                <TextButton
                    contentContainerStyle={{
                        height: 60,
                        width:90,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.bgDark,
                       
                        
                       
                    }}
                    icon={icons.arrow_right}
                    imgSyle={{
                        width:40,
                        height:40,
                        marginTop:15,
                        marginLeft:5,
                        
                    }}
                    onPress={() => navigation.navigate("SignIn")}
                />
                </Animatable.View>

            </View>
        )
    }

    return(
        <View  style={{
            flex:1,
            backgroundColor:COLORS.primary2
        }}>
          {/*Logo*/}
          {renderLogo()}
          
        </View>
    )

}


export default Splash;