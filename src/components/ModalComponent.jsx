import React, { useState, useRef } from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View , Button} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import { useNavigation } from '@react-navigation/native'


import { MaterialIcons  } from '@expo/vector-icons'; 
import { globalStyles } from '../style/globalStyles';
import { useDispatch } from 'react-redux';
import { isTimeUpFuction } from '../redux/slices/timerSlice';
import { cleanGameListWords } from '../redux/slices/setOfWordSlice';

const ModalComponent = ({modalVisible,setModalVisible}) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.container}>
        <View style={styles.model}>
          <View>
          <Text style={globalStyles.largeTitle}>Time is Up</Text>
          </View>

          {/* CONFIRM AND DELETE BUTTONS */}
          <View style={{flexDirection: 'row' , justifyContent: 'space-around'}}>
            <Pressable
              onPress={() => {
                  setModalVisible(!modalVisible),
                  navigation.navigate('SettingsView'),
                  dispatch(isTimeUpFuction(false))  ,
                  dispatch(cleanGameListWords())
                }}
              style={[styles.btnModal,{backgroundColor:'#FF4500'}]}>
                <MaterialIcons name="done" size={24} color="white" />
                <Text style={globalStyles.title}>Begin a new round</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  </View>
  )
}



export default ModalComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
      },
      model: {
        width: responsiveWidth(90),
        height: responsiveHeight(40),
        backgroundColor: '#4B3F91', // Semi-transparent background
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
        justifyContent: 'center',
        gap: responsiveHeight(5),
        borderWidth: 1.2,
        borderColor: 'white'
      },
      btnModal: {
        alignItems: 'center', 
        paddingHorizontal: 24, 
        flexDirection: 'row',
        paddingVertical: 4 ,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 8,
         // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 4,
        
      }
})