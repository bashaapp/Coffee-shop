import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import {HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline, UserCircleIcon, UserIcon } from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid} from 'react-native-heroicons/solid';
import {Cart, Home} from '../screen';
import { COLORS } from "../constants";
import Faviroute from "../screen/Favorite";
import Profile from "../screen/Profile";



const Tab = createBottomTabNavigator();



const menuIcons = (route, focused)=> {
    let icon;
    
    if (route.name === 'home') {
      icon =  focused? <HomeSolid size="30" color={COLORS.bgDark} /> : <HomeOutline size="30" strokeWidth={2} color={COLORS.lightGrey60} />
    } else if (route.name === 'favourite') {
      icon =  focused? <HeartSolid size="30" color={COLORS.bgDark} /> : <HeartOutline size="30" strokeWidth={2} color={COLORS.lightGrey60} />
    }else if(route.name==='cart'){
      icon =  focused? <BagSolid size="30" color={COLORS.bgDark} /> : <BagOutline size="30" strokeWidth={2} color={COLORS.lightGrey60} />
    } else if(route.name==='profile'){
      icon =  focused? <UserIcon size="30" color={COLORS.bgDark} /> : <UserIcon size="30" strokeWidth={2} color={COLORS.lightGrey60} />
    }

    return(
        <View style={{
            height:60,
            alignItems:'center',
            borderRadius:50,
            width:50,
            backgroundColor: focused ? '#1a1818': '#141313',
            justifyContent:'center',
        }}>
           {icon}
        </View>
    )

}


const Tabs = ()=>{
    return(
       <Tab.Navigator
         screenOptions={({route})=>({
            headerShown:false,
            tabBarShowLabel:false,
            tabBarIcon: ({focused}) => menuIcons(route, focused),
            tabBarStyle:{
                borderTopLeftRadius:40,
                borderTopWidth:0,
                borderTopRightRadius:40,
                height:60,
                backgroundColor:'#141313'
            },
            tabBarItemStyle:{
                marginTop:15
            }
         })}
       >
          <Tab.Screen name='home'  component={Home}/>
          <Tab.Screen name='favourite'  component={Faviroute}/>
          <Tab.Screen name='cart'  component={Cart}/>
          <Tab.Screen name='profile'  component={Profile}/>
         
       </Tab.Navigator>
    )
}

     

















export default Tabs