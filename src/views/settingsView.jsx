import { View, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_SETTING, HEIGHT, WIDTH } from '../constants/Constant'
import { globalStyles } from '../style/globalStyles'
import Players from '../components/Players'
import Spycies from '../components/Spycies'
import SetOfWords from '../components/SetOfWords'
import TimerComponent from '../components/TimerComponent'
import ButtonStart from '../components/ui/ButtonStart'
import Spacer from '../components/ui/Spacer'

import WarningModal from '../components/WarningModal'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigation } from '@react-navigation/native'


import generateRandom from '../utils/generateRandom'
import { pushGameListWords } from '../redux/slices/setOfWordSlice'



const SettingsView = () => {


  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [modalVisible, setModalVisible] = useState(false);

  const players  = useSelector((state)=>state.players.players)
  const spies  = useSelector((state)=>state.spies.spiesNumber)
  const { keyWordSelected , words , generateKeywordsList}  = useSelector((state)=>state.words)
  const { isEnableTime , time }  = useSelector((state)=>state.timer)

  
  const handleGameListword = ()=>{
    const myWordTest = [] 

    for (let i = 1; i <= players.length; i++) {
        myWordTest.push(keyWordSelected)
      }    
      
      if (spies <= myWordTest.length) {
        myWordTest.splice(-spies, spies, ...Array(spies).fill("you are a spy"));
      }
    dispatch(pushGameListWords(generateRandom(myWordTest)))
  }

  const checkBeforeStartGame = ()=>{
    if(players.length < 1 ){
      console.log("Please the game should incluted more than 3 player")
      return ;
    }
    if(words.length < 1){
      console.log("Please try add new keyword for start the game")
      return ;
    }
    if(keyWordSelected == null ){
      console.log("Please you should select the keywprd")
      return ;
    }

   
    return(
      <ButtonStart viewName={'GameView'}/>
    )
    }

  console.log(generateKeywordsList)

  return (
    <View>
       <ImageBackground source={BG_SETTING} style={globalStyles.backgroundImageStyle} />
      <SafeAreaView>
        <ScrollView style={{ width: WIDTH , height: HEIGHT }}>
              <Players />
              <Spacer />
              <Spycies />
              <Spacer />
              <SetOfWords />
              <Spacer />
              <TimerComponent />
              <Spacer />
              <TouchableOpacity onPress={()=>{
                if(keyWordSelected != null){
                  handleGameListword(),
                  navigation.navigate('GameView')
                }
                
              }}>
                <Text style={globalStyles.subTitle}> START</Text>
              </TouchableOpacity>
              {/* {checkBeforeStartGame()} */}
              <WarningModal modalVisible={modalVisible}  setModalVisible={setModalVisible}/>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default SettingsView;


