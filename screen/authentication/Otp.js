import React from 'react';
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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { TextButton } from '../../component';
import * as Animatable from 'react-native-animatable';



const Otp =({navigation})=>{

    const [ timer, setTimer] = React.useState(60)

    React.useEffect(()=>{
        let interval = setInterval(()=>{
            setTimer(prevTimer =>{
                if(prevTimer > 0){
                    return prevTimer -1
                } else{
                    return prevTimer
                }
            })
        },1000)
        return () => clearInterval(interval)
    },[])





    function renderHeader () {
        return(
            <View
            style={{
                marginTop:40,
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
                width:100,
                height:100,
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
                marginTop:SIZES.font,
                ...FONTS.h2,
                color:COLORS.bgDark
            }}>
               Otp Authentication
            </Text>

            </Animatable.View>

            <Animatable.View
             animation='fadeIn'
             duration={600}
             delay={2500}
        >

            <Text style={{
                marginTop:SIZES.font,
                ...FONTS.h4,
                fontWeight:'bold',
                color:COLORS.gray
            }}>
                 An authentication code has been sent to your email
            </Text>

            </Animatable.View>
        </View>
        )
    }




    function renderBody () {
        return (
            <View  style={{
                flex:1,
                marginHorizontal:SIZES.margin
            }}>
         <View
           style={{
               flex:1,
               marginTop:SIZES.padding * 1
           }}
           >
            <OTPInputView 
               pinCount={4}
               style={{
                   width:'100%',
                   height:50
               }}
               codeInputFieldStyle={{
                   width:65,
                   height:65,
                   borderRadius:SIZES.radius,
                   borderColor:COLORS.bgDark,
                   borderWidth:2,
                   backgroundColor:COLORS.lightGrey08,
                   color:COLORS.gray,
                   ...FONTS.h3
               }}

               onCodeFilled={(code)=>(
                   console.log(code)
               )}
               />

               {/*CountDown Timer*/}

               <View
               style={{
                   flexDirection:'row',
                   justifyContent:'center',
                   marginTop:SIZES.padding,
               }}
               >
                   <Text
                   style={{
                       color:COLORS.gray,
                       ...FONTS.body3
                   }}
                   >Didn't receive code?</Text>

                   <TextButton 
                       label={`Resend (${timer}s)`}
                       disabled={timer == 0 ? false : true}
                       contentContainerStyle={{
                           marginLeft:SIZES.base,
                           backgroundColor:COLORS.grey20,
                           borderRadius:20,
                           width:118,
                           height:26,  
                       }}
                       labelStyle={{
                           color:COLORS.gray2,
                           ...FONTS.h3,
                           left:3
                            
                       }}

                       onPress={()=> setTimer(60)}
                   />

               </View>
           </View>

         
           <View>
               <TextButton 
               label='Continue'
               contentContainerStyle={{
                   height:50,
                   marginTop:-70,
                   alignItems:'center',
                   borderRadius:SIZES.radius,
                   backgroundColor:COLORS.bgDark

               }}

               onPress={()=> navigation.navigate("Main")}
               
               />
           </View>
            </View>
        )

    }






return(
     <View style={{
        flex:1,
        backgroundColor:COLORS.primary2
     }}>
          {/*renderHeader*/}
          {renderHeader()}

          {/*renderBody*/}
          {renderBody()}
     </View>

       
    )
}



export default Otp;