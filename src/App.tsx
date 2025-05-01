import "./App.css";
import VoiceBar from "./components/VoiceBar";
import GameCanvas from "./components/GameCanvas";
import PowerBar from "./components/PowerBar";
import PlayerCard from "./components/PlayerCard";
import { useVoiceVolume } from "./hooks/useVoiceVolume";

function App() {
  useVoiceVolume();

  return (
    <div className="arena-page">
      <h1>🎮 Sound Clash Arena</h1>
      <div className="game-container" style={{ display: "flex", gap: "2rem" }}>
        <div className="players-panel">
          <PlayerCard />
          <VoiceBar />
          <PowerBar />
        </div>
        <div className="game-stage">
          <GameCanvas />
        </div>
      </div>
    </div>
  );
}

export default App;
