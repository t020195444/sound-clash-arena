// src/features/game/gameSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Player {
  id: string;
  name: string;
  volumeLevel: number; // 即時音量
  power: number; // 蓄力程度
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
      state.players.push(action.payload);
    },
    updateVolume: (
      state,
      action: PayloadAction<{ id: string; volume: number }>
    ) => {
      const player = state.players.find((p) => p.id === action.payload.id);
      if (player) {
        player.volumeLevel = action.payload.volume;
      }
    },
    chargePower: (
      state,
      action: PayloadAction<{ id: string; power: number }>
    ) => {
      const player = state.players.find((p) => p.id === action.payload.id);
      if (player) {
        player.power = action.payload.power;
      }
    },
    setCurrentPlayer: (state, action: PayloadAction<string>) => {
      state.currentPlayerId = action.payload;
    },
  },
});

export const { addPlayer, updateVolume, chargePower, setCurrentPlayer } =
  gameSlice.actions;
export default gameSlice.reducer;
