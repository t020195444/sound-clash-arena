// src/components/GameCanvas.tsx
import { Application, extend } from "@pixi/react";
import { Container, Graphics } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useVoiceVolume } from "../hooks/useVoiceVolume";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../app/store";
import {
  addPlayer,
  setCurrentPlayer,
  chargePower,
  resetPower,
} from "../features/game/gameSlice";
import PlayerCard from "./PlayerCard";
import PowerBar from "./PowerBar";
import VoiceBar from "./VoiceBar";
import Monster, { MonsterData } from "./Monster";

extend({ Graphics, Container });

const GameCanvas = () => {
  useVoiceVolume();
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const [attackPower, setAttackPower] = useState(0);
  const [attackX, setAttackX] = useState<number | null>(null);
  const [playerX, setPlayerX] = useState(100);
  const [monsters, setMonsters] = useState<MonsterData[]>([]);
  const attackRef = useRef<Graphics>(null);
  const [wave, setWave] = useState(1);
  const [difficulty, setDifficulty] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);

  const player = useSelector((state: RootState) =>
    state.game.players.find((p) => p.id === state.game.currentPlayerId)
  );
  const playerId = useSelector(
    (state: RootState) => state.game.currentPlayerId
  );
  const power = player?.power ?? 0;

  useEffect(() => {
    if (!initialized) {
      dispatch(
        addPlayer({
          id: "player-1",
          name: "你",
          volume: 0,
          power: 0,
          health: 100,
        })
      );
      dispatch(setCurrentPlayer("player-1"));
      setInitialized(true);
    }
  }, [initialized, dispatch]);

  useEffect(() => {
    if (!playerId) return;
    const interval = setInterval(() => {
      const latestVolume =
        store.getState().game.players.find((p) => p.id === playerId)?.volume ??
        0;
      if (latestVolume > 5) {
        dispatch(chargePower({ id: playerId, amount: latestVolume * 0.2 }));
      }
    }, 200);
    return () => clearInterval(interval);
  }, [playerId, dispatch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setPlayerX((x) => Math.max(0, x - 10));
      if (e.key === "ArrowRight") setPlayerX((x) => Math.min(560, x + 10));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (attackX !== null) {
      const timer = setInterval(() => {
        setAttackX((prev) =>
          prev !== null && prev >= 600 ? null : (prev ?? 0) + 10
        );
      }, 30);
      return () => clearInterval(timer);
    }
  }, [attackX]);

  // 怪物生成：每波生成 N 隻
  useEffect(() => {
    if (!gameOver && monsters.length === 0) {
      const newMonsters: MonsterData[] = Array.from(
        { length: wave },
        (_, i) => ({
          id: `m-${Date.now()}-${i}`,
          x: 600 + i * 60,
          health: 3 + Math.floor(difficulty),
        })
      );
      setMonsters(newMonsters);
    }
  }, [wave, difficulty, monsters.length, gameOver]);

  useEffect(() => {
    if (playerHealth <= 0 && !gameOver) {
      setGameOver(true);
      setShowPlayer(false);
      setTimeout(() => {
        alert(`Game Over\n你在第 ${wave} 波被擊倒了。`);
        setPlayerHealth(100);
        setGameOver(false);
        setShowPlayer(true);
        setWave(1);
        setDifficulty(1);
        setMonsters([]);
      }, 1000);
    }
  }, [playerHealth, wave, gameOver]);

  const drawPlayer = useCallback(
    (g: Graphics) => {
      g.clear();
      g.beginFill(0x00ff00);
      g.drawCircle(0, 0, 20);
      g.endFill();

      g.beginFill(0x444444);
      g.drawRect(-20, -30, 40, 5);
      g.endFill();

      g.beginFill(0xff0000);
      g.drawRect(-20, -30, 40 * (playerHealth / 100), 5);
      g.endFill();
    },
    [playerHealth]
  );

  const drawAttack = useCallback(
    (g: Graphics) => {
      g.clear();
      if (attackX !== null) {
        g.beginFill(0xffff00);
        g.drawCircle(0, 0, 10);
        g.endFill();
      }
    },
    [attackX]
  );

  const handleFire = () => {
    if (player && power >= 100) {
      setAttackPower(power);
      dispatch(resetPower({ id: player.id }));
      setAttackX(0);
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div>
        <PlayerCard />
        <VoiceBar />
        <PowerBar />
        <p style={{ color: "white" }}>❤️ 血量：{playerHealth}</p>
        <p style={{ color: "white" }}>🌊 第 {wave} 波</p>
        <button
          onClick={handleFire}
          disabled={power < 100 || gameOver}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: power >= 100 ? "orange" : "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: power >= 100 ? "pointer" : "not-allowed",
          }}
        >
          發射！
        </button>
      </div>
      <Application width={600} height={400} background={0x202020}>
        {showPlayer && (
          <pixiContainer x={playerX} y={200}>
            <pixiGraphics draw={drawPlayer} />
          </pixiContainer>
        )}
        {attackX !== null && (
          <pixiContainer x={playerX + attackX} y={200}>
            <pixiGraphics ref={attackRef} draw={drawAttack} />
          </pixiContainer>
        )}
        {monsters.map((m) => (
          <Monster
            key={m.id}
            monster={m}
            attackX={playerX + (attackX ?? -999)}
            attackPower={attackPower}
            playerX={playerX}
            difficulty={difficulty}
            onDeath={(id) => {
              setMonsters((prev) => prev.filter((mon) => mon.id !== id));
              if (monsters.length === 1) {
                setWave((w) => w + 1);
                setDifficulty((d) => d + 0.5);
              }
            }}
            onHitPlayer={(id) => {
              setPlayerHealth((hp) => Math.max(0, hp - 20));
              setMonsters((prev) => prev.filter((mon) => mon.id !== id));
            }}
          />
        ))}
      </Application>
    </div>
  );
};

export default GameCanvas;
