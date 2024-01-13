import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native'
import React from 'react'
import SettingHeader from './ui/SettingHeader'

import {  BUTTON_DECREMENT, BUTTON_INCERENT,ICON_TIMER, WIDTH, orange_color } from '../constants/Constant'
import { globalStyles } from '../style/globalStyles'


import { useDispatch, useSelector } from 'react-redux';

import { decreaseSpy, increaseSpy, resetSpy } from '../redux/slices/spiesCountSlice'


const Spycies = () => {

    const dispatch =  useDispatch()

    const spiesNumber = useSelector((state)=>state.spies.spiesNumber)


  return (
    <>
        <SettingHeader title={"Number Of spies"} iconLeft={ICON_TIMER} spiesNumber={spiesNumber} />
        <View style={styles.container}>
            <View style={styles.btnView}>
                <TouchableOpacity 
                    onPress={()=>dispatch(increaseSpy())}>
                    <Image source={BUTTON_INCERENT} style={styles.btn} />

                </TouchableOpacity>

                <TouchableOpacity
                    disabled={ spiesNumber < 1 ? true : false }  
                    style={{opacity:spiesNumber ==1 ? 0.2 : 1}} 
                    onPress={()=>dispatch(decreaseSpy())}>
                    <Image source={BUTTON_DECREMENT} style={styles.btn} />

                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                disabled={ spiesNumber < 4 ? true : false }  
                style={[styles.btnReset,{opacity: spiesNumber < 4 ? 0.1 : 1}]} 
                onPress={()=> dispatch(resetSpy())}>

                <Text style={globalStyles.subTitle}>Reset</Text>

            </TouchableOpacity>
        </View>
    </>
  )
}

export default Spycies;


const styles = StyleSheet.create({
    container: {
      width: WIDTH,
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    btnView:{
        flexDirection: 'row',
        gap: 10
    },
    btn:{
        width:46,
        height: 48,
    },
    btnReset: {
        width: WIDTH / 5.1,
        height: 38,
        backgroundColor: orange_color,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    
    }
  })