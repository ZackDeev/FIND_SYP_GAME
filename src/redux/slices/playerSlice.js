import { createSlice } from '@reduxjs/toolkit';
import initializeDatabase from '../../db/db';

const initialState = {
  players: [],
};


export const playerSlice = createSlice({
  name: 'playerSlice',
  initialState,
  reducers: {
    createNewPlayer: (state, action) => {
      const defaultName = `Player ${state.players.length + 1}`;
      const newPlayer = 
              action.payload === '' || action.payload === undefined
              ? defaultName
              : action.payload
      
      initializeDatabase.insertPlayer(newPlayer);
      // Push to player Array
      state.players.push({name: newPlayer});
    },

    // Update the way selectAllPlayers is dispatched
    selectAllPlayers: (state, action) => {
      state.players = action.payload;
    },

    deletePlayerById: (state, action) => {
      initializeDatabase
        .deletePlayerById(action.payload)
        .then((rowsAffected) => {
          console.log(`${rowsAffected} player(s) deleted successfully.`);
        })
        .catch((error) => {
          console.error('Error deleting player:', error);
        });
    },
  },
});

export const { createNewPlayer, selectAllPlayers, deletePlayerById } = playerSlice.actions;

// Update the way selectAllPlayers action is dispatched
export const fetchAllPlayers = () => async (dispatch) => {
  try {
    const players = await initializeDatabase.getAllPlayers();
    dispatch(selectAllPlayers(players));
  } catch (error) {
    console.error('Error fetching players:', error);
    dispatch(selectAllPlayers([])); // You might want to return an empty array or handle the error accordingly
  }
};

export default playerSlice.reducer;
