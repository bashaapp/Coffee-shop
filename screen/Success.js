import React,{useState} from 'react'
import{
    View,
    Text
} from 'react-native';
import {
  COLORS,
  FONTS,
  images, 
  SIZES,
} from '../constants'
import {SkypeIndicator} from 'react-native-indicators';
import AnimatedLottieView from 'lottie-react-native';




const Success =({navigation})=>{

  const [lottiFinished, setLottiFinished] = useState(false)

  const onAnimationFinish =()=>{

       setLottiFinished(true)
       setTimeout(()=>{
       navigation.navigate('Delivery')
    },4000)
  }
     

    return(
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:COLORS.primary2
        }}>
     {!lottiFinished ? 
      <SkypeIndicator 
       
        count={5} 
        color={COLORS.bgDark} 
        size={60} 
        hidesWhenStopped={true}
        onAnimationFinish={onAnimationFinish}
        />
      :
      <View style={{
        justifyContent:'center',
        alignItems:'center'
       }}>
         <AnimatedLottieView
            autoPlay
            loop={false} 
            source={images.done}
            style={{height:200,width:"60%"}}
      />
           <Text style={{
                   marginTop:SIZES.base,
                   ...FONTS.h1,
                   fontWeight:'bold',
                   color:COLORS.bgDark
            }}
           >Congratulations!</Text>
           <Text style={{
            marginTop:SIZES.base,
            color:COLORS.gray,
            ...FONTS.body2,
            fontWeight:'500'
           }}>Payment was successfully made</Text>
         </View>
     }
        </View>
    )
}


export default Success ;