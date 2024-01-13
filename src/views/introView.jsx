import { View, Text, ImageBackground, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import {globalStyles} from '../style/globalStyles'
import { BG_INTRO, HEIGHT, SPY_INTRO_LOGO, WIDTH } from '../constants/Constant'
import ButtonStart from '../components/ui/ButtonStart'
import Spacer from '../components/ui/Spacer'

const IntroView = () => {

  return (
    <View style={globalStyles.container}>
      <ImageBackground source={BG_INTRO} style={globalStyles.backgroundImageStyle} />
      <SafeAreaView>
          <Image source={SPY_INTRO_LOGO} style={styles.spyLogo} />
          <Spacer />
          <ButtonStart viewName={'SettingsView'} />
      </SafeAreaView>
    </View>
  )
}

export default IntroView;


const styles = StyleSheet.create({
  spyLogo:{
      width: WIDTH / 1.2,
      height: HEIGHT / 2.3,
  },
});