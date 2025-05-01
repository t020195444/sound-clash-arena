// src/hooks/useVoiceVolume.ts
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVolume } from "../features/game/gameSlice";
import { RootState } from "../app/store";

export const useVoiceVolume = () => {
  const dispatch = useDispatch();
  const playerId = useSelector(
    (state: RootState) => state.game.currentPlayerId
  );
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const setup = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;

      source.connect(analyser);
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        if (!analyserRef.current || !dataArrayRef.current || !playerId) return;
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const avg =
          dataArrayRef.current.reduce((a, b) => a + b, 0) /
          dataArrayRef.current.length;
        const volume = Math.min(Math.max(avg, 0), 100);
        dispatch(updateVolume({ id: playerId, volume }));
        requestAnimationFrame(loop);
      };

      loop();
    };

    setup();
  }, [dispatch, playerId]);
};
