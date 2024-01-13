import { createSlice , nanoid} from '@reduxjs/toolkit'

import initializeDatabase from '../../db/db';


const initialState = {
  words: [],
  errorMessage: null,
  keyWordSelected: null,
  generateKeywordsList: [],
  }

  export const setOfWordSlice = createSlice({
    name: 'setOfWordSlice',
    initialState,
    reducers: {
        createNewKeyWord: (state,action)=>{
          if(action.payload === '' || action.payload === undefined){
            state.errorMessage = ' *Word Filed is required , Please try Add new Keyword'
          }else{
          // Push to words Array
          initializeDatabase.insertWord(action.payload);
          state.words.push(action.payload);
          state.errorMessage = null;
          }
        },
        // Update the way selectAllWords is dispatched
        selectAllKeyWords: (state, action) => {
          state.words = action.payload;
        },
        deleteWordById: (state,action)=>{
          initializeDatabase
          .deleteKeyWordById(action.payload)
          .then((rowsAffected) => {
            console.log(`${rowsAffected} player(s) deleted successfully.`);
          })
          .catch((error) => {
            console.error('Error deleting player:', error);
          });
          state.words = state.words.filter((word)=>word.id != action.payload)
        },
        selectKeyWord: (state, action)=>{
          state.keyWordSelected = action.payload
        },
        pushGameListWords: (state,action)=>{
          state.generateKeywordsList.push(...action.payload)
        }
    },
  });

  export const { 
    createNewKeyWord,
    selectAllKeyWords,
    deleteWordById,
    selectKeyWord,
    pushGameListWords,

    } = setOfWordSlice.actions;

    // Update the way selectAllWords action is dispatched
  export const fetchKeyWords = () => async (dispatch) => {
    try {
      const words = await initializeDatabase.getAllKeyWords();
      dispatch(selectAllKeyWords(words));
    } catch (error) {
     console.error('Error fetching words:', error);
     dispatch(selectAllKeyWords([])); // You might want to return an empty array or handle the error accordingly
    }
};

  export default setOfWordSlice.reducer;