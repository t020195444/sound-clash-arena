import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const PowerBar = () => {
  const player = useSelector((state: RootState) =>
    state.game.players.find((p) => p.id === state.game.currentPlayerId)
  );
  const power = player?.power ?? 0;

  return (
    <div style={{ marginTop: "1rem" }}>
      <p>⚡ 蓄力值：{Math.round(power)}</p>
      <div
        style={{
          width: "100%",
          height: "20px",
          background: "#444",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${power}%`,
            height: "100%",
            background: "gold",
            transition: "width 0.1s ease-out",
          }}
        />
      </div>
    </div>
  );
};

export default PowerBar;
