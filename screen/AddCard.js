import React from "react";
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native'
import{ COLORS,SIZES,FONTS,icons,images } from '../constants'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { utils }from '../utils';
import {FormInputCheck,FormInput,RadioButton, TextButton} from '../component'

const AddCard=({navigation, route})=>{


    // States
    const [ selectedCard, setSelectedCard] = React.useState(null)
    
    const [cardNumber, setCardNumber] = React.useState("")
    const [cardNumberError, setCardNumberError] = React.useState("")
    const [cardName, setCardName] = React.useState("")
    const [cardNameError, setCardNameError] = React.useState("")
    const [expiryDate, setExpiryDate] = React.useState("")
    const [expiryDateError, setExpiryDateError] = React.useState("")
    const [cvv, setCvv] = React.useState("")
    const [cvvError, setCvvError] = React.useState("")
    const [isRemember, setIsRemember] = React.useState(false)

    


    React.useEffect(()=>{
      let {selectedCard} = route.params
        setSelectedCard(selectedCard)

    },[])

    // Render
    function renderHeader(){
        return(
            <View
               style={{
              //  height:100,
                marginTop:SIZES.padding,
                marginBottom:SIZES.font,
                backgroundColor:COLORS.primary2
               }}
            >
            <View
               style={{
                flexDirection:'row',
                marginHorizontal:SIZES.radius
               }}
            >              
            {/*back icon*/}
            <TouchableOpacity  
            style={{
               width:30,
               height:30,
               backgroundColor:COLORS.bgDark,
               justifyContent:'center',
               alignItems:'center',
               borderRadius:SIZES.base
            }}
              onPress={()=>navigation.goBack()}
            >
                <Image 
                  source={icons.back_arrow}
                  style={{
                    width:25,
                    height:25,
                    tintColor:COLORS.dark
                  }}
                />
            </TouchableOpacity>

              {/*title*/}
                <Text
                  style={{
                    color:COLORS.bgDark,
                    ...FONTS.h3,
                    fontWeight:'500',
                    left:70
                  }}
                >Add New Card
                </Text>
                </View>
            </View>
        )

    }



    function renderCard(){
        return(
            <ImageBackground
               source={images.card_1}
               style={{
                height:200,
                width:'100%',
                marginTop:SIZES.base,
                borderRadius:SIZES.radius,
                overflow:'hidden',
               
               }}
            >
                {/*logo*/}
                <Image 
                  source={selectedCard?.icon}
                  resizeMode="contain"
                  style={{
                    position:'absolute',
                    top:20,
                    right:20,
                    height:40,
                    width:80
                  }}
                />


                {/*details*/}
                <View
                   style={{
                    position:'absolute',
                    bottom:20,
                    left:-30,
                    right:0,
                    paddingHorizontal:SIZES.padding
                   }}
                >

                    <Text
                       style={{
                        color:COLORS.grey,
                        ...FONTS.h3,
                        marginBottom:5
                       }}
                    >{cardName}</Text>
                    
                   <View
                     style={{
                        flexDirection:'row'
                     }}
                   >

                    <Text style={{flex:1,color:COLORS.grey,
                    ...FONTS.body3}}>{cardNumber}</Text>
                    <Text style={{
                        ...FONTS.body3,color:COLORS.grey,
                        marginRight:-10
                    }}>{expiryDate}</Text>
                   </View>

                </View>

            </ImageBackground>
        )
    }


    function renderForms(){
      return(
        <View 
           style={{
            marginTop:SIZES.margin
           }}
        >

            {/*Card Number*/}
            <FormInput 
                
                label='Card Number ⓘ '
                keyboardType="number-pad"
                value={cardNumber}
                maxLenght={19}
                onChange={(value)=>{
                  setCardNumber(value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())
                   utils.validateInput(value, 19, setCardNumberError)
                }}
                inputStyle={{
                    color:COLORS.light
                }}
                errorMsg={cardNumberError}
                prependComponent={
                  <View
                     style={{
                      height:44,
                      width:'18%',
                      marginLeft:-SIZES.radius,
                      marginHorizontal:SIZES.font,
                      borderTopLeftRadius:SIZES.radius,
                      borderBottomLeftRadius:SIZES.radius,
                      backgroundColor:COLORS.lightGrey08,
                      alignItems:'center',
                      justifyContent:'center'
                     }}
                  >

                    {/*card icon*/}
                  <Image 
                      source={selectedCard?.icon}
                      resizeMode="contain"
                      style={{
                          height:40,
                          width:'80%',
                        }}
                        />

                  </View>
                }
                appendComponent={
                  <FormInputCheck 
                    value={cardNumber}
                    error={cardNumberError}
                  />
                }
            />

             {/*Card holder Namer*/}
             <FormInput 
                label='Cardholder Name ⓘ '
                value={cardName}
                onChange={(value)=>{
                   utils.validateInput(value, 1,
                    setCardNameError)
                    setCardName(value)
                }}
                containerStyle={{
                  marginTop:SIZES.radius
                }}
                inputStyle={{
                    color:COLORS.light,
                }}
                errorMsg={cardNameError}
               
                appendComponent={
                  <FormInputCheck 
                    value={cardName}
                    error={cardNameError}
                  />
                }
            />

            {/*expiry & cvv container*/}
            <View
               style={{
                  flexDirection:'row',
                  marginTop:SIZES.radius,
               }}
            >

              {/*Expiration Date*/}
             <FormInput 
                label='Expiry Date ⓘ '
                placeholder='MM/YY'
                value={expiryDate}
                maxLenght={5}
                onChange={(value)=>{
                   utils.validateInput(value, 5,
                    setExpiryDateError)
                    setExpiryDate(value)
                }}
                containerStyle={{
                  flex:1
                }}
                inputStyle={{
                    color:COLORS.light,
                }}
                errorMsg={expiryDateError}
               
                appendComponent={
                  <FormInputCheck 
                    value={expiryDate}
                    error={expiryDateError}
                  />
                }
            />


             {/*CVV*/}
             <FormInput 
                label='CVV ⓘ '
                value={cvv}
                maxLenght={3}
                onChange={(value)=>{
                   utils.validateInput(value, 3,
                    setCvvError)
                    setCvv(value)
                }}
                containerStyle={{
                  flex:1,
                  marginLeft:SIZES.radius
                }}
                inputStyle={{
                    color:COLORS.light,
                }}
               
                appendComponent={
                  <FormInputCheck 
                    value={cvv}
                    error={cvvError}
                  />
                }
            />

            </View>


          {/*Remember Button*/}  
          <View
             style={{
              alignItems:'flex-start',
              marginTop:SIZES.padding_1,
             }}
          >
            <RadioButton 
              label="Remember this card details"
              isSelected={isRemember}
              onPress={()=>setIsRemember(!isRemember)}
            />

          </View>

        </View>
      )
    }


    function renderFooter(){
      return(
        <View
           style={{
            paddingTop:SIZES.radius,
            paddingBottom:SIZES.padding_1,
            paddingHorizontal:SIZES.padding_1
           }}
        >

            <TextButton 
              label='Proceed Payment'
              contentContainerStyle={{
                height:60,
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.bgDark
              }}
               labelStyle={{
                fontSize:16,
                fontWeight:'bold'
               }}
               onPress={()=>navigation.navigate("Success")}
              
            />

        </View>
      )
    }


    return(
        <View style={{
            flex:1,
            backgroundColor:COLORS.primary2
        }}>
           {/*Header*/}
           {renderHeader()}


           {/*Body*/}
           <KeyboardAwareScrollView
             keyboardDismissMode="on-drag"
             contentContainerStyle={{
                flexGrow:1,
                paddingHorizontal:SIZES.radius
             }}
           
           >
                {/*Card*/}
                {renderCard()}

                {/*Forms*/}
                {renderForms()}

           </KeyboardAwareScrollView>

           {/*Footer*/}
           {renderFooter()}


           {/*Footer*/}
        </View>
    )
}


export default AddCard;