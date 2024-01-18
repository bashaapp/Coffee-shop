import React, { useEffect, useState } from "react";
import{
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    FlatList,
    ActivityIndicator
} from 'react-native';

import{
    COLORS,
    FONTS,
    SIZES,
    icons,
} from '../../constants'

import { MotiView, useAnimationState } from "moti";
import { Shadow } from "react-native-shadow-2";
import {TextButton, FormInput, IconButton, CountryDropDown, CheckBox} from "../../component";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { BarIndicator,} from 'react-native-indicators';
//import { auth } from "../../firebase";
import {signInWithEmailAndPassword}  from 'firebase/auth';
import { initializeApp, initializeAuth } from "firebase/app";
import { firebaseConfig } from "../../firebase";

import { app } from '../../firebase'
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//Animate Login Button
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity)
const auth = getAuth(app);

const SignIn=({navigation})=>{


  //Animation
  const animatedWidth = useSharedValue(250)
  const animatedRadius = useSharedValue(30)
  const animatedStyle = useAnimatedStyle(()=>{
    return{
      width:animatedWidth.value,
      borderRadius:animatedRadius.value
    }
  })
    
    // State
    const [mode, setMode] = useState('signIn')
    const [ isVisible, setIsVisible] = useState(false)

    // Country
    const [countries, setCountries] = React.useState([])
    const [showCountryModal, setShowCountryModal] = React.useState(false)


    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [selectedCountry, setSelectedCountry] = React.useState(null)
    const [checked, setChecked] = React.useState(false)
    const [clicked, setClicked] = useState(false)
   
   // const app = initializeApp(firebaseConfig)
   // const auth = getAuth(app);


    function handleSignUp () {
      createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential)=>{
        console.log('Account created')
        const user = userCredential.user
      })
      .catch(error =>{
        console.log(error)
      })
    }


    const handleSignIn=async () => {
        
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
      });
  
    };


    useEffect(()=>{
     const unsubsribe = auth.onAuthStateChanged(user =>{
        if(user) {
          navigation.replace('Main')
        }
      })

      return unsubsribe;
    })


    // Animation States
    const animationState = useAnimationState({
        signIn:{
            height: SIZES.height * 0.55
        },
        signUp:{
            height:SIZES.height * 0.7
        }
    })


    React.useEffect(()=>{
        animationState.transitionTo('signIn')

          // Fetch countires
          fetch("https://restcountries.com/v2/all")
          .then(response => response.json())
          .then(data => {
              let countryData = data.map(item => {
                  return {
                      code: item.alpha2Code,
                      name: item.name,
                      callingCode: `+${item.callingCodes[0]}`,
                      flag: `https://countryflagsapi.com/png/${item.alpha2Code}`
                  }
              })

              setCountries(countryData)
          })
    },[])

     //Render
    function renderCountryModal() {
      return (
          <Modal
              animationType="slide"
              transparent={true}
              visible={showCountryModal}
          >
              <TouchableWithoutFeedback
                  onPress={() => setShowCountryModal(false)}
              >
                  <View
                      style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: COLORS.dark80
                      }}
                  >
                      <View
                          style={{
                              height: 400,
                              width: SIZES.width * 0.8,
                              backgroundColor: COLORS.light,
                              borderRadius: SIZES.radius
                          }}
                      >
                          <FlatList
                              data={countries}
                              keyExtractor={(item) => item.code}
                              contentContainerStyle={{
                                  paddingHorizontal: SIZES.padding,
                                  paddingBottom: SIZES.padding,
                              }}
                              renderItem={({ item }) => {
                                  return (
                                      <TouchableOpacity
                                          style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginTop: SIZES.radius
                                          }}
                                          onPress={() => {
                                              console.log(item)
                                              setSelectedCountry(item)
                                              setShowCountryModal(false)
                                          }}
                                      >
                                          <Image
                                              source={{uri: item.flag }}
                                              resizeMode="contain"
                                              style={{
                                                  width: 40,
                                                  height: 30
                                              }}
                                          />
                                          <Text style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }}>{item.name}</Text>
                                      </TouchableOpacity>
                                  )
                              }}
                          />
                      </View>
                  </View>
              </TouchableWithoutFeedback>
          </Modal>
      )
  }

    function renderAuthContainer(){
        if(mode == 'signIn'){
            return renderSignIn()
        } else{
            return renderSignUp()
        }
    }


  function renderSignIn(){
        return(
            <MotiView
              state={animationState}
              style={{
                marginTop:SIZES.radius,
                height:SIZES.height * 0.55,
              }}
            >
                <Shadow>
                <Animatable.View 
                 
                   style={style.authContainer}>
                    <Text
                       style={{
                        width:"55%",
                        lineHeight:45,
                        color:COLORS.bgDark,
                        ...FONTS.h1,
                        fontWeight:'bold'
                       }}
                    >
                        Sign in to continue
                    </Text>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps={"handled"}
                        extraScrollHeight={-300}
                        contentContainerStyle={{
                            flexGrow:1,
                            justifyContent:'center'
                        }}
                    >

                        {/*Email Input*/}
                        <FormInput 
                            containerStyle={{
                               borderRadius:SIZES.radius,
                               backgroundColor:COLORS.primary2
                            }}
                            value={email}
                            onChange={(text)=>setEmail(text)}
                            placeholder='Email'
                            placeholderTextColor={COLORS.lightGrey20}
                            inputStyle={{
                              color:COLORS.grey
                            }}
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
                               justifyContent:'center',
                             
                              }}
                           >
                            <Image 
                              source={icons.email}
                              style={{
                                width:25,
                                height:25,
                              }}
                            />
                           </View>
                            
                          }
                        />

                        {/*Password*/}
                         <FormInput 
                            containerStyle={{
                               marginTop:SIZES.radius,
                               borderRadius:SIZES.radius,
                               backgroundColor:COLORS.primary2
                            }}
                            inputStyle={{
                              color:COLORS.grey,
                            }}
                            value={password}
                            onChange={(text)=>setPassword(text)}
                            secureTextEntry={!isVisible}
                            placeholder='Password'
                            placeholderTextColor={COLORS.lightGrey20}
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
                               justifyContent:'center',
                               alignSelf:'center'
                              }}
                           >
                            <Image 
                              source={icons.lock}
                              style={{
                                width:25,
                                height:25,
                              }}
                            />
                           </View>
                            
                          }

                          appendComponent={
                            <IconButton 
                              icon={isVisible? icons.eye_off:icons.eye}
                              iconStyle={{
                                tintColor:COLORS.grey60
                              }}

                              onPress={()=>setIsVisible(!isVisible)}
                            
                            />
                          }
                        />
                      
                      <View
                         style={{
                            alignItems:'flex-end'
                         }}
                      >
                         <TextButton 
                              label='Forgot Password?'
                              contentContainerStyle={{
                              marginTop:SIZES.radius,
                              backgroundColor:null,
                            }}

                              labelStyle={{
                              color:COLORS.bgDark,
                              ...FONTS.h4
                            }}
                          />
                      </View>
                    </KeyboardAwareScrollView>

                    {/*Login Button*/}
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                     <AnimatedBtn
                       style={[
                         {
                          height:55,
                          width:250,
                          borderRadius:30,
                          backgroundColor:COLORS.bgDark,
                          justifyContent:'center',
                          alignItems:'center'
                        },animatedStyle
                      ]}
                      
                      onPress={
                         handleSignIn}>
                      {clicked ? 
                      <BarIndicator count={4} color={COLORS.gray2} size={20} />:
                     <Text 
                         style={{
                             color:COLORS.grey,
                             fontWeight:'700',
                             ...FONTS.h3
                      }}>Login</Text>}
                      </AnimatedBtn>
                    </View>
                </Animatable.View>
                </Shadow>

            </MotiView>
        )

    }


    function renderSignUp(){
        return(
            <MotiView
              state={animationState}
              style={{
                marginTop:SIZES.radius,
              }}
            >
                <Shadow>
                 <View style={style.authContainer}>
                    <Text
                       style={{
                        lineHeight:45,
                        ...FONTS.h1,
                        fontWeight:'bold',
                        color:COLORS.bgDark
                       }}
                    >
                      Create new account
                    </Text>
                    <KeyboardAwareScrollView
                       showsVerticalScrollIndicator={false}
                        enableOnAndroid={true}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps={"handled"}
                        extraScrollHeight={-300}
                        contentContainerStyle={{
                            flexGrow:1,
                            justifyContent:'center',
                            marginTop:SIZES.padding,
                            paddingBottom:SIZES.padding * 2,
                        }}
                    >

                      {/*Name*/}
                      <FormInput 
                          containerStyle={{
                            borderRadius:SIZES.radius,
                            backgroundColor:COLORS.primary2
                          }}
                          placeholder='Name'
                          placeholderTextColor={COLORS.lightGrey20}
                          value={name}
                          onChange={(text)=>setName(text)}
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
                             justifyContent:'center',
                             alignSelf:'center'
                            }}
                         >
                            <Image 
                               source={icons.person}
                               style={{
                                width:25,
                                height:25,
                              
                               }}
                            />
                            </View>
                          }
                      />

                       {/*Email*/}
                      <FormInput 
                          containerStyle={{
                            marginTop:SIZES.radius,
                            borderRadius:SIZES.radius,
                            backgroundColor:COLORS.primary2
                          }}
                          placeholder='Email'
                          placeholderTextColor={COLORS.lightGrey20}
                          value={email}
                          onChange={(text)=>setEmail(text)}
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
                             justifyContent:'center',
                             alignSelf:'center'
                            }}
                         >
                            <Image 
                               source={icons.email}
                               style={{
                                width:25,
                                height:25,
                               
                               }}
                            />
                          
                          </View>
                        }
                      />

                        {/*Phone*/}
                      <FormInput 
                          containerStyle={{
                            marginTop:SIZES.radius,
                            borderRadius:SIZES.radius,
                            backgroundColor:COLORS.primary2
                          }}
                          placeholder='Phone'
                          placeholderTextColor={COLORS.lightGrey20}
                          value={phone}
                          onChange={(text)=>setPhone(text)}
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
                             justifyContent:'center',
                             alignSelf:'center'
                            }}
                         >
                            <Image 
                               source={icons.phone}
                               style={{
                                width:25,
                                height:25,
                                
                               }}
                            />
                            </View>
                          }
                      />

                      {/*Country*/}
                      <CountryDropDown 
                         containerStyle={{
                            marginTop:SIZES.radius,
                            
                         }}
                         selectedCountry={selectedCountry}
                         onPress={()=>setShowCountryModal(!showCountryModal)}
                      
                      />

                         {/*Password*/}
                         <FormInput 
                            containerStyle={{
                               marginTop:SIZES.radius,
                               borderRadius:SIZES.radius,
                               backgroundColor:COLORS.primary2
                            }}
                            value={password}
                            onChange={(text)=>setPassword(text)}
                            secureTextEntry={!isVisible}
                            placeholder='Password'
                            placeholderTextColor={COLORS.lightGrey20}
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
                               justifyContent:'center',
                               alignSelf:'center'
                              }}
                           >
                            <Image 
                              source={icons.lock}
                              style={{
                                width:25,
                                height:25,
                            
                              }}
                            />
                            </View>
                          }

                          appendComponent={
                            <IconButton 
                              icon={isVisible? icons.eye_off:icons.eye}
                              iconStyle={{
                                tintColor:COLORS.grey60
                              }}

                              onPress={()=>setIsVisible(!isVisible)}
                            
                            />
                          }
                        />

                        {/*Terms & Conditions*/}
                        <CheckBox 
                           containerStyle={{
                             marginTop:SIZES.radius
                           }}
                           isSelected={checked}
                           onPress={()=>setChecked(!checked)}
                        />
                    </KeyboardAwareScrollView>

                    {/*Sign Up Button*/}
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                     <AnimatedBtn
                       style={[
                         {
                          height:55,
                          width:250,
                          borderRadius:30,
                          backgroundColor:COLORS.bgDark,
                          justifyContent:'center',
                          alignItems:'center'
                        },animatedStyle
                      ]}
                      
                      onPress={()=>{
                           handleSignUp
                        if (animatedWidth.value == 250){
                          animatedWidth.value = withTiming(50, {duration:500})
                          animatedRadius.value = withTiming(25, {duration:500})
                          setClicked(true)
                        }else{
                          animatedWidth.value = withTiming(250, {duration:500})
                          animatedRadius.value = withTiming(20, {duration:500})
                          setClicked(false)
                         
                        }
                        setTimeout(() => {
                          navigation.navigate("Main")
                        }, 5000);
                      }}
                    >
                      {clicked ? 
                      <BarIndicator count={4} color={COLORS.gray2} size={20} />:
                     <Text 
                         style={{
                             color:COLORS.grey,
                             fontWeight:'700',
                             ...FONTS.h3
                      }}>Create Account</Text>}
                      </AnimatedBtn>
                    </View>
                    </View>
                </Shadow>

            </MotiView>
        )


    }


    function renderFooter(){
      return(
          <View
              style={{
                flexDirection:'row',
                height:80,
                alignItems:'center',
                justifyContent:'center',
                marginTop:-15,
                marginHorizontal:SIZES.radius,
                paddingBottom:SIZES.radius,
                borderBottomLeftRadius:SIZES.radius,
                borderBottomRightRadius:SIZES.radius,
                backgroundColor:COLORS.primary2,
                zIndex:0
              }}
          >

            <Text
               style={{
                color:COLORS.grey,
                ...FONTS.body5
               }}
            >
              {mode== "signIn"? "Don't have account?" : "already have an account."}
            </Text>
               

            {/*Toggle the forms Button*/}
            <TextButton 
               label={mode == "signIn" ? "Create New Account" :
              "Sign In"}

              contentContainerStyle={{
                 marginLeft:SIZES.base,
                 backgroundColor:null
              }}
              labelStyle={{
                color:COLORS.bgDark,
                ...FONTS.h5,
              }}
              onPress={()=>{
                if(animationState.current === 'signIn'){
                    animationState.transitionTo('signUp')
                    setMode("signUp")
                } else{
                    animationState.transitionTo('signIn')
                    setMode('signIn')
                }}
              }
            />

          </View>
      )
    }

    function renderSocialLogin(){
      return(
          <View
             style={{
              flex:1,
              alignItems:'center',
              justifyContent:'center',
              marginTop:-30,
             // zIndex:-1
             }}
          >

            <Text
              style={{
                color:COLORS.gray,
                ...FONTS.body3
              }}
            >
              OR login with
            </Text>

            <View
              style={{
                flexDirection:'row',
                marginTop:SIZES.radius
              }}
            >

              {/*Twitter Button*/}
               <IconButton 
                  icon={icons.twitter}
                  iconStyle={{
                     tintColor:COLORS.primary2
                  }}
                  containerStyle={style.socialButton}
               />

                {/*Google Button*/}
                <IconButton 
                  icon={icons.google}
                  iconStyle={{
                     tintColor:COLORS.primary2
                  }}
                  containerStyle={{...style.socialButton, marginLeft:SIZES.radius}}
               />

                {/*Facebook Button*/}
                <IconButton 
                  icon={icons.linkedin}
                  iconStyle={{
                     tintColor:COLORS.primary2
                  }}
                  containerStyle={{...style.socialButton, marginLeft:SIZES.radius}}
               />
            </View>
              
          </View>
      )
    }

    return(
        <View style={{
            flex:1,
            backgroundColor:COLORS.primary2,
            paddingHorizontal:SIZES.padding
        }}>
            <Image
              source={icons.logooo}
              resizeMode="contain"
              style={{
                width:100,
                height:110,
                alignSelf:'center',
                marginTop:SIZES.margin,
                tintColor:COLORS.bgDark
              }}
            />

            {/*Auth Container*/}
            <View style={{
                alignSelf:'center',
                zIndex:1
            }}>
              {renderAuthContainer()}
            </View>

            {/*renderFooter*/}
              {renderFooter()}

            {/*social login*/}  
            {mode == "signIn" && renderSocialLogin()}
            {/*render Country Modal*/}
              {renderCountryModal()}

        </View>
    )
}


const style = StyleSheet.create({
    authContainer:{
        flex:1,
        width: SIZES.width - (SIZES.padding * 0.9),
        paddingHorizontal:15,
        paddingVertical:SIZES.radius,
        borderRadius:SIZES.radius,
        backgroundColor:COLORS.primary2,
        zIndex:1  
    },
    socialButton:{
      width:55,
      height:55,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:SIZES.radius,
      backgroundColor:COLORS.grey
    }
})




export default SignIn;
