import React from "react";
import{
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'

import{
    COLORS,
    SIZES,
    FONTS,
    icons
} from '../constants'


const CardItem=({item, CardStyle, isSelected, onPress})=>{
    return(
        <TouchableOpacity 
          style={{
            flexDirection:'row',
            height:100,
            alignItems:'center',
            marginTop:SIZES.radius,
            paddingHorizontal:SIZES.padding,
            borderWidth:1,
            borderRadius:SIZES.radius,
            borderColor:isSelected? COLORS.bgDark:
            COLORS.grey60,
            ...CardStyle
          }}
            onPress={onPress}
        >
            {/*Card Image*/}
            <View 
                style={{
                    width:60,
                    height:50,
                    alignItems:'center',
                    justifyContent:'center',
                   
                }}
            >
                <Image 
                  source={item.icon}
                  resizeMode='contain'
                  style={{
                    width:60,
                    height:60,
                    
                  }}
                />
            </View>

            {/*Name*/}
            <Text
              style={{
                flex:1,
                marginLeft:SIZES.radius,
                ...FONTS.h3,
                color:isSelected? COLORS.bgDark:COLORS.grey
              }}
            >{item.name}
            </Text>

            {/*Radio Button*/}
            <Image 
              source={isSelected? icons.check_on : icons.check_off}
              style={{
                width:25,
                height:25,
                tintColor:isSelected? COLORS.bgDark : COLORS.grey
              }}
            />
        </TouchableOpacity>
    )
}



export default CardItem;