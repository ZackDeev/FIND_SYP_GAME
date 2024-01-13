import React, { useState, useRef } from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View , Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { HEIGHT, WIDTH } from '../constants/Constant';

import { MaterialIcons ,Ionicons } from '@expo/vector-icons'; 
import { globalStyles } from '../style/globalStyles';
import { selectedTime } from '../redux/slices/timerSlice';
import { useDispatch } from 'react-redux';



const ModelTimer = ({modalVisible,setModalVisible}) => {

  const dispatch = useDispatch()

    const [selectedMinute, setSelectedMinute] = useState('5');

    const pickerRef = useRef();
  
  
    const handleButtonPress = () => {
      const selectedValue = pickerRef.current.props.selectedValue;
      setSelectedMinute(selectedValue);
      setModalVisible(false);
  
      if (selectedValue !== '00') {

        dispatch(selectedTime(selectedValue))

      } else {
        console.warn('Please select a minute before confirming.');
      }
    };

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
          <Text style={[globalStyles.title,{alignSelf: 'center'}]}>Select Minute</Text>
          <Picker
            selectedValue={selectedMinute}
            onValueChange={(itemValue) => setSelectedMinute(itemValue)}
            ref={pickerRef}
            itemStyle={{ color: 'white', fontWeight: 'bold' ,fontSize: 22 }}>

          <Picker.Item label="" value="05" />
          {Array.from({ length: 20 }, (_, i) => {
            const minute = (i + 1).toString().padStart(2, '0');
            return <Picker.Item key={minute} label={minute} value={minute} />;
          })}
           </Picker>
          </View>

          {/* CONFIRM AND DELETE BUTTONS */}
          <View style={{flexDirection: 'row' , justifyContent: 'space-around'}}>
          <Pressable
              onPress={handleButtonPress}
              style={[styles.btnModal,{backgroundColor:'#22C55E'}]}>
                <Ionicons name="close" size={24} color="white" />
                <Text style={globalStyles.subTitle}>Confirm</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={[styles.btnModal,{backgroundColor:'#FF4500'}]}>
                <MaterialIcons name="done" size={24} color="white" />
                <Text style={globalStyles.subTitle}>Close</Text>
            </Pressable>
          </View>
        </View>

      </View>
    </Modal>
  </View>
  )
}



export default ModelTimer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
      },
      model: {
        width: WIDTH / 1.1,
        height: HEIGHT / 1.9,
        backgroundColor: '#4B3F91', // Semi-transparent background
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
        justifyContent: 'space-around',
        borderWidth: 1.2,
        borderColor: 'white'
      },
      btnModal: {
        alignItems: 'center', 
        paddingHorizontal: 24, 
        paddingVertical: 4 ,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',

         // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 4,
        
      }
})