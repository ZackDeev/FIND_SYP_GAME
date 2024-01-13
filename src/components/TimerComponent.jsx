import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useEffect, useState} from 'react'
import SettingHeader from './ui/SettingHeader'
import { ARROW_RIGHT, ICON_TIMER } from '../constants/Constant'
import { globalStyles } from '../style/globalStyles'
import ModelTimer from './ModelTimer'
import { useDispatch, useSelector } from 'react-redux'
import { withTime } from '../redux/slices/timerSlice'

const TimerComponent = () => {

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [timePicker,setTimePicker] = useState(0)

  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(withTime(isEnabled))
  },[isEnabled])

  const { isEnableTime , time }  = useSelector((state)=>state.timer)



  return (
    <View >
      <SettingHeader title={"Timer"} iconLeft={ICON_TIMER} isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
      <TouchableOpacity
        disabled={!isEnabled&& true}
        onPress={()=> (
          setModalVisible(!modalVisible)
        )}
        style={isEnabled ? styles.isEnabledStyle : styles.isNotEnabledStyle}
        className={`${!isEnabled ?'opacity-20':'opacity-100'} bg-[#282844] border-2 ${ isEnabled ?'border-[#21CF46]':'border-[#D92348]'} px-8 py-2 rounded-full`}>
        <Text style={globalStyles.subTitle}>00:{time}</Text>
       </TouchableOpacity>
       <ModelTimer modalVisible={modalVisible}  setModalVisible={setModalVisible}/>

    </View>
  )
}

export default TimerComponent

const styles = StyleSheet.create({

  isNotEnabledStyle:{
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.20,
    backgroundColor: '#282844',
    borderWidth:2,
    borderColor: '#D92348',
    borderRadius:30,
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginHorizontal: 20

  },
  isEnabledStyle:{
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    backgroundColor: '#282844',
    borderWidth:2,
    borderColor: '#21CF46',
    borderRadius:30,
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginHorizontal: 20

  }
})