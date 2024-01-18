import React from "react";
import{
    View,
    TextInput,
} from 'react-native';

import{
    FONTS,
    SIZES,
    COLORS,
} from '../constants'
import { Text } from "moti";


const FormInput = ({
    containerStyle,
    inputContainerStyle,
    placeholder,
    inputStyle,
    value = "",
    prependComponent,
    appendComponent,
    onChange,
    onPress,
    editable,
    secureTextEntry,
    keyboardType = 'default',
    autoCompleteType = "off",
    autoCapitalize = "none",
    maxLenght,
    errorMsg = "",
    label,
    placeholderTextColor = COLORS.lightGrey60,
    cursorColor
})=>{
    return(
        <View style={{...containerStyle}}>
            
              {/*label container*/}
              <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    paddingHorizontal:SIZES.base,
                }}>
                <Text style={{color:COLORS.grey,...FONTS.body4, fontWeight:'500'}}>{label}</Text>
                <Text style={{color:COLORS.error,...FONTS.body4}}>{errorMsg}</Text>
                </View>


            {/*input value container*/}
            <View
               style={{
                flexDirection:'row',
                height:SIZES.height > 800 ? 55:45,
                marginTop:SIZES.height > 800 ? SIZES.base:0,                paddingHorizontal:SIZES.radius,
                borderRadius:SIZES.radius,
                //alignItems:'center',
                backgroundColor:COLORS.grey08,
                ...inputContainerStyle,
               }}
            >
              
                {prependComponent}

                <TextInput 
                  style={{
                    flex:1,
                    paddingVertical:0,
                    ...FONTS.body3,
                    ...inputStyle
                  }}
                 clearButtonMode='always'
                  value={value}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderTextColor}
                  secureTextEntry={secureTextEntry}
                  keyboardType={keyboardType}
                  autoCompleteType={autoCompleteType}
                  autoCapitalize={autoCapitalize}
                  maxLength={maxLenght}
                  onChangeText={(text)=>onChange(text)}
                  onPressIn={onPress}
                  editable={editable}
                  cursorColor={cursorColor}


                />

                {appendComponent}

            </View>

        </View>
    )
}





export default FormInput;