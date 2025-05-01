// src/components/Monster.tsx
import { useEffect, useState } from "react";

export interface MonsterData {
  id: string;
  x: number;
  health: number;
}

interface MonsterProps {
  monster: MonsterData;
  attackX: number;
  attackPower: number;
  playerX: number;
  difficulty: number;
  onDeath: (id: string) => void;
  onHitPlayer: (id: string) => void;
}

const Monster = ({
  monster,
  attackX,
  attackPower,
  playerX,
  difficulty,
  onDeath,
  onHitPlayer,
}: MonsterProps) => {
  const [x, setX] = useState(monster.x);
  const [health, setHealth] = useState(monster.health);
  const speed = 1 + difficulty * 0.2;
  const radius = 20;

  useEffect(() => {
    const interval = setInterval(() => {
      setX((prev) => prev - speed);
    }, 30);
    return () => clearInterval(interval);
  }, [speed]);

  const [isHit, setIsHit] = useState(false);

  useEffect(() => {
    if (Math.abs(x - attackX) < radius && !isHit) {
      setIsHit(true);
      setHealth((h) => {
        const next = h - attackPower / 50;
        if (next <= 0) {
          onDeath(monster.id);
        }
        return next;
      });
    } else if (Math.abs(x - attackX) >= radius) {
      setIsHit(false);
    }
  }, [attackX, attackPower, x, onDeath, monster.id, isHit]);

  useEffect(() => {
    if (x < playerX + 20) {
      onHitPlayer(monster.id);
    }
  }, [x, playerX, onHitPlayer, monster.id]);

  return (
    <pixiContainer x={x} y={180}>
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(0xff0000);
          g.drawRect(0, 0, 40, 40);
          g.endFill();

          g.beginFill(0x000000);
          g.drawRect(0, -10, 40, 5);
          g.endFill();

          g.beginFill(0x00ff00);
          g.drawRect(0, -10, 40 * (health / monster.health), 5);
          g.endFill();
        }}
      />
    </pixiContainer>
  );
};

export default Monster;
