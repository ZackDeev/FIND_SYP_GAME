import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';

const CountdownTimer = ({ duration, isRunning, startTimer, stopTimer, resetTimer,setIsRunning }) => {

  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(interval);
          setIsRunning(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);



  return (
    <View>
      <Text className='text-5xl font-bold text-white text-center my-11'>
        {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
      </Text>
      {/* <Button title="Start" onPress={startTimer} disabled={isRunning} />
      <Button title="Stop" onPress={stopTimer} disabled={!isRunning} />
      <Button title="Reset" onPress={resetTimer} disabled={isRunning} /> */}
    </View>
  );
};

export default CountdownTimer;

