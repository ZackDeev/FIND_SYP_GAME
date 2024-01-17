import { View, Text, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { globalStyles } from '../style/globalStyles';
import { BG_SETTING } from '../constants/Constant';
import CardComponent from '../components/CardComponent';

import { useNavigation } from '@react-navigation/native'

import Animated, {
  useSharedValue,
  runOnJS,
  useAnimatedReaction
} from 'react-native-reanimated';
import { cleanGameListWords, pushGameListWords } from '../redux/slices/setOfWordSlice';
import CountdownTimer from '../components/TimerCountDown';
import Spacer from '../components/ui/Spacer';
import ModalComponent from '../components/ModalComponent';



const GameView = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);


  const players = useSelector((state)=>state.players.players)
  const { generateKeywordsList}  = useSelector((state)=>state.words)


  const activeIndex = useSharedValue(0)
  const [index,setIndex] = useState(0)

  const [timer, setTimer] = useState(3);
  const [isRunning, setIsRunning] = useState(false);
  const { time , withTime , isTimeUp}  = useSelector((state)=>state.timer)

console.log("isTimeUp",isTimeUp)

  useAnimatedReaction(()=> activeIndex.value , 
    (value,prevValue)=> {
      if(Math.floor(value) != index){
        runOnJS(setIndex)(Math.floor(value))
      }
  })


  useEffect(()=>{
    if(isTimeUp){
      setModalVisible(true)
    }else{
      setModalVisible(false)
    }
    
    
  },[isTimeUp])



    // *******************  FOR TIMER  ************************

    useEffect(()=>{
      if( withTime && index === players.length ){
        setIsRunning(true);
      }
    },[index])

    useEffect(() => {
      let interval;
      if ( timer > 0) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 10); //00
      } else if (timer === 0) {
        clearInterval(interval);

      }
  
      return () => {
        clearInterval(interval);
      };
    }, [timer]);

    
  return (
    <GestureHandlerRootView>
      <View style={globalStyles.container}>
        <ImageBackground source={BG_SETTING} style={globalStyles.backgroundImageStyle} />
        <SafeAreaView>
                {/*  PLAY CARDS  */}
                {index != players.length && 
                <Animated.View style={styles.container}>
                  {generateKeywordsList.map((keyword, index)=> 
                      <CardComponent
                        key= {index} 
                        keyword= {keyword}
                        numOfcards= {players.length}
                        index= {index}
                        activeIndex={ activeIndex }
                        />
                      )}

                </Animated.View>
                }
                {/* DISPLAY TIMES OR JUST BUTTON RESTART GAME  */}
                {index === players.length &&
                  <View>
                    <Text style={globalStyles.largeTitle}>Did you found spy ? </Text>
                    <Spacer />
                    {withTime &&  <CountdownTimer minutes={0.01} /> }
                    <Spacer />
                    <TouchableOpacity
                      onPress={()=>
                        {
                          navigation.goBack()
                          dispatch(cleanGameListWords())
                        }
                      }
                      style={globalStyles.buttonStart}>
                        <Text style={globalStyles.title}>Restart</Text>
                    </TouchableOpacity>
                  </View>
                }

         <ModalComponent modalVisible={modalVisible}  setModalVisible={setModalVisible}/>

        </SafeAreaView>
      </View>
     </GestureHandlerRootView>
  )
}

export default GameView;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})