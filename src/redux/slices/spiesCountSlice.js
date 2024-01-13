import { createSlice, nanoid, } from '@reduxjs/toolkit'


const initialState = {
    spiesNumber: 1,
  }

  export const spiesCountSlice = createSlice({
    name: 'spiesCountSlice',
    initialState,
    reducers: {
        increaseSpy: (state,action)=>{
            state.spiesNumber = state.spiesNumber + 1
        },
        decreaseSpy: (state,action)=>{
          if(state.spiesNumber > 1){
            state.spiesNumber = state.spiesNumber - 1
          }
        },
        resetSpy: (state, action)=>{
            state.spiesNumber = 1
          
        }

    },
  })

  export const { 
    increaseSpy,
    decreaseSpy,
    resetSpy
    } = spiesCountSlice.actions;

  export default spiesCountSlice.reducer;
