import { View, Text, StyleSheet, ImageBackground , TouchableOpacity } from 'react-native'
import React from 'react'
import { BG_SET_WORD, WIDTH } from '../../constants/Constant';
import { globalStyles } from '../../style/globalStyles';
import { useDispatch } from 'react-redux';
import { selectKeyWord } from '../../redux/slices/setOfWordSlice';

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
        width: WIDTH / 1.6,
        height: 60,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    
    },
    bgSetWord:{
        width: WIDTH / 1.6,
        height: 60,
        position: 'absolute'
    },
  })