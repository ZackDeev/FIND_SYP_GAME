import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import PlayerCard from './ui/PlayerCard'
import SettingHeader from './ui/SettingHeader'
import { ADD, ARROW_RIGHT ,ICON_TIMER, IC_SPY, WIDTH } from '../constants/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'


import { fetchAllPlayers } from '../redux/slices/playerSlice'



const Players = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch()

  useEffect(() => {
    // Dispatch the fetchAllPlayers action when the component mounts
    dispatch(fetchAllPlayers());
  }, [dispatch]);
  
  const players = useSelector((state)=>state.players.players)


  return (
    <>
        <SettingHeader 
          title={"Players"} 
          iconLeft={ICON_TIMER} 
          iconRight={ARROW_RIGHT} 
          link={"PlayersView"}
        />
        
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.container}>

          {players.length === 0 && 
              <View>
              <TouchableOpacity
                onPress={()=>navigation.navigate('PlayersView')}>
                  <PlayerCard icon={ADD} />
              </TouchableOpacity>
              </View>   
              } 

            {players && players.map((player,index)=>(
                <PlayerCard key={index} player={player} image={IC_SPY} />
                ))}
        </ScrollView>
    </>
  )
}

export default Players;

const styles = StyleSheet.create({
    container: {
      width: WIDTH,
      height: 120,
    },
    bgPlayer:{
    
    },
    icSpy: {}
  })



