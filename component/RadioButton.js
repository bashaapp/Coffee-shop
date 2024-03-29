import React from "react";
import{
    TouchableOpacity,
    Text,
    Image
} from 'react-native'
import{COLORS,SIZES,FONTS,icons} from '../constants'


const RadioButton =({
    containerStyle,
    label,
    labelStyle,
    iconStyle,
    isSelected,
    onPress
})=>{
    return(
        <TouchableOpacity
           style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            ...containerStyle
           }}
           onPress={onPress}
        >
            <Image 
               source={isSelected? icons.check_on:icons.check_off}
            style={{
                marginLeft:5,
                width:20,
                height:20,
                ...iconStyle,
                tintColor:isSelected?COLORS.bgDark:COLORS.grey
            }}
            />

            <Text
               style={{
                marginLeft:SIZES.radius,
                color:COLORS.grey,
                ...FONTS.body3,
                ...labelStyle,
               }}
            >{label}</Text>

        </TouchableOpacity>
    )
}

export default RadioButton