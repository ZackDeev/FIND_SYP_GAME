import { View, Text, SafeAreaView, ImageBackground, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../style/globalStyles'

import { WIDTH ,ICON_GO_BACK , orange_color, HEIGHT, BG_SETTING } from '../constants/Constant'
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { createNewKeyWord, fetchKeyWords, deleteWordById } from '../redux/slices/setOfWordSlice'



const SetOfWordsView = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch()

  useEffect(() => {
    // Dispatch the fetchAllPlayers action when the component mounts
    dispatch(fetchKeyWords());
  }, [dispatch]);

  const { words , errorMessage} = useSelector((state)=>state.words)

  const [currentWord,setCurrentWord] = useState(undefined)

  const createWordFun = ()=>{
    dispatch(createNewKeyWord(currentWord))
    dispatch(fetchKeyWords())
}

  return (
    <View style={styles.container}>
      <ImageBackground source={BG_SETTING} style={globalStyles.backgroundImageStyle} />
      <SafeAreaView>
        {/* Title && button go back */}
        <View style={styles.headerView}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
           <Ionicons name={ICON_GO_BACK} size={24} color="white" />
          </TouchableOpacity>
          <Text style={globalStyles.titleButton}>Set Of Words</Text>
        </View>
        {/* Create new Player */}
        <View style={{paddingHorizontal: 16}}>
          <Text style={globalStyles.subTitle}>Add New Word</Text>
            <TextInput
                 value={currentWord}
                 onChangeText={setCurrentWord}
                 placeholder='Enter KeyWord'
                 style={styles.input}
                 placeholderTextColor={'white'}/>
             <TouchableOpacity onPress={(createWordFun)} style={styles.btn}>
                 <Text style={globalStyles.subTitle}>Add</Text>
             </TouchableOpacity>
             {errorMessage != null && (<Text style={globalStyles.errorTextStyle}>{errorMessage}</Text>)}
        </View>
        <ScrollView>
          {words && words.map((keyword,index)=>(
            <View key={index}
                  style={{width: WIDTH, flexDirection: 'row' , justifyContent: 'space-between' , padding: 16}}>
                  <Text>{keyword.name}</Text>
                  <TouchableOpacity 
                    onPress={()=> dispatch(deleteWordById(keyword.id))}
                    style={{backgroundColor: orange_color, padding: 4, borderRadius: 4}}>
                    <Text style={globalStyles.subTitle}>Delete</Text>
                  </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default SetOfWordsView;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#ccc',
  },
  headerView: {
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 11,
  },
  input: {
    height: HEIGHT / 16 ,
    borderWidth: 3,
    borderColor: orange_color,
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 0,
    marginVertical: 14,
    color: "white",
  },
  btn: {
    height: HEIGHT / 16 ,
    backgroundColor: orange_color,
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 0,
    marginVertical: 14,
    color: "white",
    justifyContent: 'center',
    alignItems: 'center'
  }
})
