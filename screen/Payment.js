import React from "react";
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    
} from 'react-native'
import{
    COLORS,
    FONTS,
    SIZES,
    icons,
} from '../constants'
import Carousel from "react-native-snap-carousel";
import dummyData, { PaymentCard,} from "../constants/dummyData";
import CardItem from "../component/CardItem";
import { ScrollView } from "react-native";
import {TextButton} from '../component'




const Payment =({navigation})=>{


  const [selectedCard, setSelectedCard] = React.useState(null)


     // Render
     function renderHeader(){
        return(
            <View
               style={{
                height:120,
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
                >Payment Methods
                </Text>
                </View>
            </View>
        )
    }

    function ProductCard({item,onPress, isSelected}){
        return(
          <TouchableOpacity style={{
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.grey80,
            borderColor:COLORS.primary2,
            borderWidth:1,
            marginTop:SIZES.font,
            height:160,
            width:245
          }}
            onPress={onPress} 
            isSelected={isSelected}
          >
  
            <View  style={{alignItems:'center',}}>
            
                <Image 
                   source={item.icon}
                   resizeMode="contain"
                   style={{
                    height:140,
                    width:140,
                   // tintColor:COLORS.primary2
                   }}
                />
              
            </View>
          </TouchableOpacity>
        )
      }


    function renderBody(){
        return(
            <View
               style={{
                height:80,
                backgroundColor:COLORS.primary2,
                borderTopLeftRadius:SIZES.radius,
                borderTopRightRadius:SIZES.radius,
               
               }}
            >
              <View
                   style={{
                    width:265,
                    height:150,
                    marginTop:-80,
                    borderRadius:SIZES.font,
                    alignSelf:'center',
                    alignItems:'center'
                   }}
                > 
                <Carousel 
                   containerCustomStyle={{overflow:'visible'}}
                   data={PaymentCard}
                   loop={true}
                   renderItem={({item})=>

                   <ProductCard
                   key={`MyCard-${item.id}`}
                   isSelected={`${selectedCard?.key}-${
                   selectedCard?.id}` == `MyCard-${item?.id}`}
                   onPress={()=>{
                    setSelectedCard({...item,
                   key:"MyCard",}), navigation.navigate('AddCard', {selectedCard:selectedCard})}}
                 
                   item={item} 
                   />}

                   firstItem={1}
                   inactiveSlideOpacity={0.75}
                   inactiveSlideScale={0.77}
                   sliderWidth={250}
                   itemWidth={230}
                   slideStyle={{display:'flex',alignItems:'center'}}
              /></View>
            </View>
        )
    }


    function renderNewCards(){
        return(
            <View style={{
              height:300,
              marginTop:SIZES.margin,
              marginLeft:SIZES.base,
              }}>

           <Text style={{
                ...FONTS.h2z,
                fontWeight:'600',
                color:COLORS.bgDark
           }}>Other Payment Methods</Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
               contentContainerStyle={{
                flexGrow:1,
                marginTop:SIZES.base,
                paddingHorizontal:SIZES.font,
                paddingBottom:SIZES.radius,
               }}
            >
                {dummyData.allCards.map((item,index)=>(
                <CardItem 
                 key={`NewCard-${item.id}`}
                 item={item}
                 isSelected={`${selectedCard?.key}-${selectedCard?.id}` ==  `NewCard-${item.id}`}
                 onPress={()=>setSelectedCard({...item,
                 key:"NewCard"})}
                
                />
              ))} 
            </ScrollView>

        </View>
        )
    }


    function renderFooter(){
       return(
           <View
               style={{
                height:150,
                marginTop:-SIZES.base,
                paddingHorizontal:SIZES.padding,
                backgroundColor:COLORS.primary2,
              
               }}
           >

               <TextButton
                 disabled={selectedCard == null}
                 contentContainerStyle={{
                   height:50,
                   marginTop:SIZES.font,
                   borderRadius:SIZES.radius,
                   backgroundColor: selectedCard == null ? COLORS.grey:
                   COLORS.bgDark
                 }}
                 label={selectedCard?.key == 'NewCard' ? 'Add'
                 :'Current Card'}
                 labelStyle={{
                   color:COLORS.black
                 }}

                 onPress={()=>{
                  if(selectedCard?.key == 'NewCard'){
                    navigation.navigate('AddCard',{
                      selectedCard:selectedCard})
                  }else{
                    navigation.navigate('AddCard',{
                      //selectedCard:selectedCard
                    })
                  }
                 }}
               />

           </View>
       )
    }


   





    return(
        <View
           style={{
            flex:1,
            backgroundColor:COLORS.primary2
           }}
        >
            {/*render Header*/}
            {renderHeader()}

            {/*render Body*/}
            {renderBody()}

           
            {/*add new cards*/}
            {renderNewCards()}

            {/*render footer*/}
            {renderFooter()}
                

          
        </View>
    )
}



export default Payment;