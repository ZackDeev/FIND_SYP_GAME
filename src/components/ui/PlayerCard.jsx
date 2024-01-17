import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ADD, BG_PLAYER_CARD } from '../../constants/Constant';
import { globalStyles } from '../../style/globalStyles';
import { Entypo } from '@expo/vector-icons';

import { responsiveWidth , responsiveHeight } from 'react-native-responsive-dimensions'



const PlayerCard = ({player , image , icon }) => {

  return (
    <View style={styles.container}>
      {icon && <Entypo name={ADD} size={32} color="white" style={styles.icon} />}
      <ImageBackground source={BG_PLAYER_CARD} style={styles.bgPlayer} />
      {image && <Image source={image} style={styles.icSpy} />}
      {player &&  <Text style={globalStyles.subTitle}>{`${player.name}`}</Text>}
    </View>
  )
}

export default PlayerCard;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(27),
    height: responsiveHeight(13),
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgPlayer:{
    width: 126,
    height: 110,
    position: 'absolute',
  },
  icSpy: {
    width: 38,
    height: 38,
    marginBottom: 6
  },
  icon: {
    position: 'absolute',
    zIndex: 50
  }
  
})