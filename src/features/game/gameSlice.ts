import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  id: string;
  name: string;
  volume: number;
  power: number;
  health: number;
}

interface GameState {
  players: Player[];
  currentPlayerId: string | null;
}

const initialState: GameState = {
  players: [],
  currentPlayerId: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      if (state.players.find((p) => p.id === action.payload.id)) return;
      state.players.push(action.payload);
    },
    updateVolume: (
      state,
      action: PayloadAction<{ id: string; volume: number }>
    ) => {
      const player = state.players.find((p) => p.id === action.payload.id);
      if (player) {
        player.volume = action.payload.volume;
      }
    },

    chargePower: (
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      const player = state.players.find((p) => p.id === action.payload.id);
      if (player) {
        player.power = Math.min(100, player.power + action.payload.amount);
      }
    },
    resetPower: (state, action: PayloadAction<{ id: string }>) => {
      const player = state.players.find((p) => p.id === action.payload.id);
      if (player) {
        player.power = 0;
      }
    },
    setCurrentPlayer: (state, action: PayloadAction<string>) => {
      state.currentPlayerId = action.payload;
    },
  },
});

export const {
  addPlayer,
  updateVolume,
  chargePower,
  resetPower,
  setCurrentPlayer,
} = gameSlice.actions;

export default gameSlice.reducer;
