import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'; 
import { WIDTH } from '../../constants/Constant';
import { globalStyles } from '../../style/globalStyles';

import { Link } from '@react-navigation/native';






const SettingHeader = ({ 
    iconLeft, 
    iconRight , 
    title , 
    spiesNumber , 
    isEnabled , 
    toggleSwitch , 
    link=null}) => {

  return (
    <View style={styles.container}>
        <View style={styles.leftSide}>
            <Ionicons name={iconLeft} size={24} color="white" />
            <Text style={globalStyles.title}>{title}</Text>
        </View>

         {/* DISPALY ICON IF ALREADY EXIST */}
         
        {iconRight && <Link to={{screen:link}}>
            <Ionicons name={iconRight} size={24} color="white" />
        </Link> 
         }

        {/* DISPALY SPICE NUMBER IF ALREADY EXIST */}
        {spiesNumber && <Text style={[globalStyles.title,{fontSize:24}]}>{`${spiesNumber}`}</Text>}

        {/* DISPALY TIMER IF ALREADY EXIST */}
            {toggleSwitch && 
            <Switch
                trackColor={{ false: '#282844', true: '#282844' }}
                thumbColor={isEnabled ? '#21CF46' : '#D92348'}
                ios_backgroundColor="#282844"
                onValueChange={toggleSwitch}
                value={isEnabled}
                thumbSize={30}
                thumbStyle={{      width: 40, // Adjust the width to your desired size
                height: 40, // Adjust the height to your desired size
                borderRadius: 20, }}
             />
            }


        
    </View>
  )
}

export default SettingHeader;

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 18
    },
    leftSide: {
        flexDirection: 'row',
        flexWrap:'wrap',
        alignItems: 'center',
        gap: 10
    }
})