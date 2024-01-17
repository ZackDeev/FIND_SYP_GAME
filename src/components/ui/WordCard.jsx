import { View, Text, StyleSheet, ImageBackground , TouchableOpacity } from 'react-native'
import React from 'react'
import { BG_SET_WORD, WIDTH } from '../../constants/Constant';
import { globalStyles } from '../../style/globalStyles';
import { useDispatch } from 'react-redux';
import { selectKeyWord } from '../../redux/slices/setOfWordSlice';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const WordCard = ({word}) => {
  const dispatch = useDispatch()
  return (
    <TouchableOpacity onPress={()=> dispatch(selectKeyWord(word.name))}>
    <View style={styles.container}>
       <ImageBackground source={BG_SET_WORD} style={styles.bgSetWord} /> 
      <Text style={globalStyles.subTitle}>{word.name}</Text>
    </View>
    </TouchableOpacity>
  )
}

export default WordCard;

const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(62),
        height: responsiveHeight(7),
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center'
    
    },
    bgSetWord:{
        width: responsiveWidth(62),
        height: responsiveHeight(7),
        position: 'absolute'
    },
  })