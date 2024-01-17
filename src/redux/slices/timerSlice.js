import { createSlice, nanoid, } from '@reduxjs/toolkit'


const initialState = {
    withTime: false,
    time: 5,
    timePicker:5,
    isTimeUp: false,
  }

  export const timerSlice = createSlice({
    name: 'timerSlice',
    initialState,
    reducers: {
        withTime: (state,action)=>{
            state.withTime = action.payload
        },
        selectedTime: (state,action)=>{
            state.time = action.payload
        },
        handleTimePicker: (state,action)=>{
          state.timePicker = action.payload
        },
        isTimeUpFuction: (state,action)=>{
          state.isTimeUp = action.payload
        },
    },
  })

  export const { 
    withTime,
    selectedTime,
    handleTimePicker,
    isTimeUpFuction,
    
    } = timerSlice.actions;

  export default timerSlice.reducer;
