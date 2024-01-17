import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../style/globalStyles';


const ButtonStart = ({viewName}) => {
    const navigation = useNavigation();

    const handlPress = ()=>{
      navigation.navigate(viewName)

    }

  return (
    <TouchableOpacity onPress={handlPress} style={globalStyles.buttonStart}>
        <Text style={globalStyles.titleButton}>Start Now</Text>
    </TouchableOpacity>
  )
}

export default ButtonStart