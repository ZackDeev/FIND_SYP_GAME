import { View, Text, ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { useSelector } from 'react-redux';

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { globalStyles } from '../style/globalStyles';
import { BG_INTRO } from '../constants/Constant';
import CardComponent from '../components/CardComponent';

import Animated, {
  useSharedValue,
  runOnJS
} from 'react-native-reanimated';
import CountdownTimer from '../components/CountdownTimer';



const GameView = () => {


  const players = useSelector((state)=>state.players.players)
  const { generateKeywordsList}  = useSelector((state)=>state.words)
  const { withTime}  = useSelector((state)=>state.timer)
  const [users,setUsers] = useState(players)
  const activeIndex = useSharedValue(0)
  const [index,setIndex] = useState(0)

  return (
    <GestureHandlerRootView>
      <View style={globalStyles.container}>
        <ImageBackground source={BG_INTRO} style={globalStyles.backgroundImageStyle} />
        <SafeAreaView>
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