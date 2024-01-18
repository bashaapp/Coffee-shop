import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import { FONTS, COLORS } from "../constants"

const TextButton = ({
    contentContainerStyle,
    disabled,
    label,
    labelStyle,
    onPress,
    icon,
    imgSyle
}) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                ...contentContainerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Image 
              source={icon}

              style={{
                 ...imgSyle,
                        
              }}
            />
            <Text style={{ color: COLORS.secondary, ...FONTS.h3, ...labelStyle }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default TextButton;