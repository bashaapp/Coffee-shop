import React from "react";
import{
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

import { COLORS,icons } from "../constants";



const FormInputCheck=({value, error})=>{
    return(
        <View  style={{
             justifyContent:'center'
        }}>

            <Image 
              source={(value= "" ||(value !=""  && error == ""))
            ? icons.correct : icons.cancel }

            style={{
                height:20,
                width:20,
                tintColor:(value == "") ? COLORS.grey : ( value !=""
                && error == "") ? COLORS.green : COLORS.error
            }}
            />

        </View>
    )
}


export default FormInputCheck;