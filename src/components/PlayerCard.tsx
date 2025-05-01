// src/components/PlayerCard.tsx
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const PlayerCard = () => {
  const players = useSelector((state: RootState) => state.game.players);

  return (
    <div style={{ color: "white", marginTop: "1rem" }}>
      <h3>👥 玩家列表</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {players.map((player) => (
          <li key={player.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{player.name}</strong>（Power: {Math.round(player.power)} /
            Health: {player.health}）
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerCard;
