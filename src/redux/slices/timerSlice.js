import { createSlice, nanoid, } from '@reduxjs/toolkit'


const initialState = {
    withTime: false,
    time: 5,
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
    },
  })

  export const { 
    withTime,
    selectedTime,
    } = timerSlice.actions;

  export default timerSlice.reducer;
