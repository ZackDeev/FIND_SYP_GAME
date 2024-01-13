import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import SettingHeader from './ui/SettingHeader'
import { ADD, ARROW_RIGHT, BG_ADD_SET_WORD, IC_ARROW_LEFT, IC_ARROW_RIGHT, WIDTH } from '../constants/Constant'
import { Entypo } from '@expo/vector-icons';

import WordCard from './ui/WordCard'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigation } from '@react-navigation/native'
import { fetchKeyWords } from '../redux/slices/setOfWordSlice'


const SetOfWords = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch()

  useEffect(() => {
    // Dispatch the fetchAllPlayers action when the component mounts
    dispatch(fetchKeyWords());
  }, [dispatch]);

  const { words , errorMessage} = useSelector((state)=>state.words)

  return (
    <>
      <SettingHeader 
          title={"Set Of Words"} 
          iconLeft={ARROW_RIGHT} 
          iconRight={ARROW_RIGHT}
          link={"SetOfWordsView"}
       /> 

      <View style={styles.container}>
      { words.length != 0 &&
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.scrollView}>
              {words && words.map((word,index)=>(
                <WordCard key={index} word={word} />
                ))}
        </ScrollView>  }
        {words.length === 0 && 
          <View>
          <TouchableOpacity
            style={{justifyContent: 'center', width: 100, alignItems: 'center' }}
            onPress={()=>navigation.navigate('SetOfWordsView')}>
              <Entypo name={ADD} size={24} color="white" />
              <Image source={BG_ADD_SET_WORD} style={styles.bgSetWord} resizeMode="contain" /> 
          </TouchableOpacity>
          </View>   
          }   
          <TouchableOpacity 
            disabled={words.length === 0 ? true : false} 
            onPress={()=>console.log("pressed")} 
            style={[styles.icLeft,{opacity:words.length === 0 ? 0:100}]}>
            <Image style={styles.img} source={IC_ARROW_LEFT}  /> 
          </TouchableOpacity>
          <TouchableOpacity           disabled={words.length === 0 ? true : false} 
            onPress={()=>console.log("pressed")} 
            style={[styles.icRight,{opacity:words.length === 0 ? 0:100}]}>
            <Image style={styles.img} source={IC_ARROW_RIGHT} /> 
          </TouchableOpacity>
      </View> 
    </>
  )
}

export default SetOfWords;

const styles = StyleSheet.create({
    container: {
      width: WIDTH,
      height: 60,
    },
    scrollView: {
      width: WIDTH,
      height: 60,
    },
    img: {
      width: WIDTH / 20,
      height: WIDTH / 10,

    },
    icLeft: {
      position: 'absolute',
      left: 10,
      top: 10,
    },
    icRight: {
      position: 'absolute',
      right: 4,
      top: 10
    },
    bgSetWord:{
      position: 'absolute',
      zIndex: -1
  },
  })