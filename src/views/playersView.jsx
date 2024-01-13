import { View, Text, SafeAreaView, ImageBackground, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../style/globalStyles'

import { WIDTH ,ICON_GO_BACK , orange_color, HEIGHT, BG_SETTING } from '../constants/Constant'
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'

import { createNewPlayer , deletePlayerById, fetchAllPlayers } from '../redux/slices/playerSlice'



const PlayersView = () => {


  const navigation = useNavigation();
  const dispatch = useDispatch()

  useEffect(() => {
    // Dispatch the fetchAllPlayers action when the component mounts
    dispatch(fetchAllPlayers());
  }, [dispatch]);
  
  const players = useSelector((state)=>state.players.players)

  const [playerName,setPlayerName] = useState(undefined)
  const [error,setError] = useState(undefined)


  const createPlayerFun = async ()=>{
    dispatch(createNewPlayer(playerName))
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
          <Text style={globalStyles.titleButton}>Players</Text>
        </View>
        <ScrollView>
         {/* Create new Player */}

        <View style={{paddingHorizontal: 16}}>
          <Text style={globalStyles.subTitle}>Create new player</Text>
            <TextInput
                 value={playerName}
                 onChangeText={setPlayerName}
                 placeholder={`Player ${players.length + 1}`}
                 style={styles.input}
                 placeholderTextColor={'white'}/>
                 {error != undefined && (<Text style={globalStyles.errorTextStyle}>{error}</Text>)}
             <TouchableOpacity onPress={(createPlayerFun)} style={styles.btn}>
                 <Text style={globalStyles.subTitle}>Add</Text>
             </TouchableOpacity>
        </View>

          {/* check if players exist */}
          <View style={{paddingHorizontal: 16}}>
            {players.length === 0 && <Text style={globalStyles.subTitle}>no player exist , if you want start game please create new players !</Text>}
          </View>

          {/* display all players */}
          {players && players.map((player,index)=>
          <View key={index}>
          <Text style={globalStyles.subTitle}>{player.name}</Text>
          <TouchableOpacity 
            onPress={()=> (
            dispatch(deletePlayerById(player.id)),
            dispatch(fetchAllPlayers())
            )
            }>
            <Text>Delete</Text>
          </TouchableOpacity>
          </View>
          )}
             
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default PlayersView;

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