import React from "react";
import{
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import{
    COLORS,SIZES,FONTS,icons
} from '../constants'

const CheckBox =({
    containerStyle,
    isSelected,
    onPress
})=>{
    return(
        <TouchableOpacity
            style={{
                flexDirection:'row',
                ...containerStyle
            }}
            onPress={onPress}
        >
            <View
               style={{
                width:25,
                height:25,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:SIZES.base,
                borderWidth:3,
                borderColor:isSelected? COLORS.primary:COLORS.grey,
                backgroundColor:isSelected? COLORS.primary:null
               }}
            >
                {isSelected && 
                   <Image 
                      source={icons.checkmark}
                      style={{
                        width:20,
                        height:20,
                        tintColor:COLORS.light
                      }}
                   />
                }
            </View>

            <Text
                style={{
                    flex:1,
                    marginLeft:SIZES.base,
                    ...FONTS.body5,
                    lineHeight:20,
                    color:COLORS.bgDark
                }}
            >
                By registering, you agree to our terms & that you have read our Data Use Policy

            </Text>

        </TouchableOpacity>
    )
}


export default CheckBox