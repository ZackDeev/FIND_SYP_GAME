import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../style/globalStyles';
import { useDispatch } from 'react-redux';
import { isTimeUpFuction } from '../redux/slices/timerSlice';

const CountdownTimer = ({ minutes }) => {
  const [seconds, setSeconds] = useState(minutes * 60);

  const dispatch = useDispatch()

  useEffect(() => {
    if (seconds <= 0) {
      // Stop the countdown when it reaches zero
      dispatch(isTimeUpFuction(true))  
      return;

    }

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clear the interval when the component is unmounted or when the countdown reaches zero
    return () => clearInterval(intervalId);
  }, [seconds]); // Include 'seconds' in the dependency array

  // Format the remaining time into minutes and seconds
  const displayTime = () => {
    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    return `${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
  };

  return (
    <View>
      <Text style={globalStyles.timerStyle}>{displayTime()}</Text>
      {/* You can add a reset button or other UI elements as needed */}
    </View>
  );
};

export default CountdownTimer;
