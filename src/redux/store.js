import { configureStore } from '@reduxjs/toolkit'
import spiesCountSlice from './slices/spiesCountSlice'
import playerSlice from './slices/playerSlice'
import setOfWordSlice from './slices/setOfWordSlice'
import timerSlice from './slices/timerSlice'


export const store = configureStore({
    reducer: {
      spies:spiesCountSlice,
      players:playerSlice,
      words: setOfWordSlice,
      timer: timerSlice,
    },
  })