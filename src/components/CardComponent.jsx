import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BG_INTRO, HEIGHT, SPY_LOGO, WIDTH, orange_color } from '../constants/Constant'

import {  GestureDetector ,Gesture } from 'react-native-gesture-handler';

import Animated,{ interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

import { globalStyles } from '../style/globalStyles';
import { useSelector } from 'react-redux';


const CardComponent = ({
        keyword, 
        numOfcards, 
        index, 
        activeIndex ,

    }) => {

    const translationX = useSharedValue(0)


    const [displayCard,setDispalyCard] = useState(false)

    const [bool,setBool] = useState(false)

    
    const { keyWordSelected } =  useSelector((state)=>state.words)

    

    const animatedCard = useAnimatedStyle(()=>({
        opacity: interpolate(
            activeIndex.value,
            [index - 1, index , index + 1],
            [ 1 -  1/5 , 1 , 1 ]),
        transform: [
            {scale: interpolate(
                activeIndex.value,
                [index - 1, index , index + 1],
                [ 0.95 , 1 , 1 ]
                )
            },
            {translateY: interpolate(
                activeIndex.value , 
                [index - 1, index , index + 1],
                [-30, 0, 0])
            },
            {translateX: translationX.value
            
            },
            {rotateZ:  `${ interpolate(
                    translationX.value, 
                    [ -WIDTH / 2 , 0 , WIDTH / 2] , 
                    [-15 , 0 , 15]
                    )} deg`
              
            }
        ]    
    }));

    const gesture = Gesture.Pan()
    .onBegin((e)=>{
        activeIndex.value = interpolate(
            Math.abs( translationX.value),
            [0, 500],
            [index, index + 0.8]
            );
        })
    .onFinalize((e)=>{
        // try {
        //     if (activeIndex.value + 1 === numOfcards) {
        //       console.log("Finish sweeping all cards");
        //       handleCardSweep(index) // Call the callback with true when sweeping finishes
        //     }
        //   } catch (error) {
        //     console.error("Error in onFinalize:", error);
        //   }

    
    })
    .onChange((e)=>(
      translationX.value = e.translationX 
    ))
    .onEnd((e)=>{

        if(Math.abs(e.velocityX) > 400 ) {
            translationX.value = withSpring(
              Math.sign(e.velocityX) * 500,
              {
                velocity: e.velocityX,
            });

    //  if(displayCard === true){
    //     if(Math.abs(e.velocityX) < 10 ){
    //         translationX.value = withSpring(
    //           Math.sign(e.velocityX) * 500,
    //           {
    //             velocity: e.velocityX,
    
    //         });
    //  } else {
    //     if(Math.abs(e.velocityX) > 440 ) {
    //         translationX.value = withSpring(
    //           Math.sign(e.velocityX) * 500,
    //           {
    //             velocity: e.velocityX,
    //         });
    //  }}

        activeIndex.value = withSpring( index + 1)
      }else{
        translationX.value = withSpring(0)
      }

    });


  return (
    
    <GestureDetector gesture={gesture}>
        <Animated.View 
            style={[
                styles.container,
                animatedCard,
                {
                    zIndex: numOfcards - index,
                }]}>
                    <Image source={BG_INTRO} style={styles.cardImage} />
                    { displayCard && 
                    <View style={styles.viewCard}>
                        {keyWordSelected != keyword ?  <Image source={SPY_LOGO} style={styles.spyLogo} /> : null}
                        { displayCard && <Text style={globalStyles.subTitle}>{keyword}</Text>}
                    </View>
                    }
                    <View style={styles.viewTest}>
                        <TouchableOpacity 
                            onPress={(prev)=>setDispalyCard(!displayCard)}>
                            <Text style={[globalStyles.subTitle,styles.dipsyBtn]}>
                                {displayCard == false ? 'Show card': 'Hide card'}
                            </Text>
                        </TouchableOpacity>
                    </View>
        </Animated.View>
    </GestureDetector>
  )
}

export default CardComponent


const styles = StyleSheet.create({
    container: {
        width: WIDTH / 1.2,
        height: HEIGHT / 1.6,
        backgroundColor: '#ccc',
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 4,
    },
    viewTest:{
        position: 'absolute'
    },

    viewCard: {
        width: WIDTH / 1.2,
        height: HEIGHT / 1.6,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(7, 6, 0, 0.59)',
        position: 'absolute',
        borderRadius: 20,
    },
    cardImage: {
        width: WIDTH / 1.2,
        height: HEIGHT / 1.6,
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 4,
    },
    spyLogo: {
        // width: WIDTH / 2,
        // height: HEIGHT / 4,
        position: 'absolute',
        zIndex: 60,
    },
    dipsyBtn:{
        backgroundColor: orange_color,
        padding: 4,
        borderRadius: 10
    }
})