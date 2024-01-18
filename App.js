import React from 'react';
import { Easing } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import {AddCard, Cart, Delivery, MainScreen, ProductDetails, SignIn, Splash, Success} from './screen';
import Payment from './screen/Payment';
import { CartProvider } from './Context/Context';
import Otp from './screen/authentication/Otp';
import { ToastProvider } from 'react-native-toast-notifications'


const Stack = createSharedElementStackNavigator();
const options = {
  getureEnabled:false,
  transitionSpec:{
    open:{
      animation:'timing',
      config:{duration:400, easing:Easing.inOut(Easing.ease)}
    },
    close:{
      animation:'timing',
      config:{duration:400, easing:Easing.inOut(Easing.ease)}
    }
  },
  cardStyleInterpolator:({current:{progress}})=>{
    return{
      cardStyle:{
        opacity:progress,
        backgroundColor:'red'
      }
    }
  }
}

const App = ()=>{

  return (
    <ToastProvider>
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
         useNativeDriver:true,
         headerShown:false, 
         cardStyle:{backgroundColor:'#000',}
         }}
         detachInactiveScreen={false}
      ><Stack.Screen  name="Success" component={Success}/>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name='Main' options={[{headerShown:false,},options]} component={MainScreen}/>
         <Stack.Screen  name="Delivery" component={Delivery}/>
         <Stack.Screen  name="Payment" component={Payment}    options={options}/>
         <Stack.Screen name="Splash" component={Splash} />
         <Stack.Screen name="AddCard" component={AddCard} />

    
        <Stack.Screen 
           name='ProductDetails'
           component={ProductDetails}
           options={options}
           sharedElements={(route, otherRoute, showing) => {
            const { item } = route.params;
            return [`item.${item.id}.photo`];
          }}
    />
    <Stack.Screen  name="Cart" component={Cart}    options={options}/>
    



    </Stack.Navigator>
  </NavigationContainer>
  </CartProvider>
  </ToastProvider>
  )
}



export default App;
