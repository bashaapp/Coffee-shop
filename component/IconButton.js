import React from "react";
import{
    TouchableOpacity,
    Image
} from 'react-native'
import { COLORS, icons } from "../constants";


const IconButton =({
    containerStyle,
    icon,
    iconStyle,
    onPress
})=>{
    return(
        <TouchableOpacity
            style={{
                alignItems:'center',
                justifyContent:'center',
                ...containerStyle
            }}

            onPress={onPress}
        >

            <Image 
               source={icon}
              // resizeMethod="contain"
               style={{
                width:25,
                height:25,
                tintColor:COLORS.primary,
                ...iconStyle
               }}
            
            
            />

        </TouchableOpacity>
    )
}


export default IconButton;