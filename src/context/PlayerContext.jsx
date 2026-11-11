import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import * as api from "../lib/api.js";

const PlayerContext = createContext(null);

// Hook para consumir el estado global del reproductor de audio.
export function usePlayer() {
  return useContext(PlayerContext);
}

// Proporciona el estado del reproductor y las acciones de reproducción a toda la app.
export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Actualiza el progreso de reproducción y reinicia el estado al terminar el audio.
  useEffect(() => {
    const audio = audioRef.current;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };
    const onDurationChange = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnd);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Guarda periódicamente el tiempo de reproducción en el almacenamiento local.
  useEffect(() => {
    if (!current) return;
    const id = setInterval(() => {
      const p = { id: current.id, currentTime: audioRef.current.currentTime };
      const all = api.getProgress();
      all[current.id] = p;
      api.setProgress(all);
    }, 5000);
    return () => clearInterval(id);
  }, [current]);

  function resolveAudioSource(episode) {
    if (!episode) return "";

    if (episode.audioUrl === null) return "";
    if (episode.audioUrl) return episode.audioUrl;

    const categorySlug = (episode.learningPathTitle || episode.category || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const fallbackCategory = categorySlug.includes("html")
      ? "html"
      : categorySlug.includes("css")
        ? "css"
        : categorySlug.includes("javascript") || categorySlug.includes("js")
          ? "javascript"
          : "html";

    return `/audios/${fallbackCategory}/${episode.id}.wav`;
  }

  // Reproduce un episodio y actualiza el estado actual.
  function playEpisode(episode) {
    if (!episode) return;
    const audio = audioRef.current;
    const source = resolveAudioSource(episode);
    if (!source) return;

    if (current?.id !== episode.id) {
      audio.src = source;
      setCurrent({ ...episode, audioUrl: source });
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
    }

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      setIsPlaying(true);
    }
  }

  // Pausa la reproducción actual.
  function pause() {
    audioRef.current.pause();
    setIsPlaying(false);
  }

  // Alterna entre reproducir y pausar según el estado actual.
  function toggle() {
    const audio = audioRef.current;
    if (!current) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  // Reproduce el siguiente episodio disponible dentro del mismo tema.
  async function playNextEpisode() {
    if (!current) return;

    const list = await api.getEpisodes();
    const sameTheme = list.filter(
      (ep) => ep.learningPathTitle === current.learningPathTitle && ep.audioUrl
    );
    const next =
      sameTheme.find((ep) => ep.lessonNumber > current.lessonNumber) || sameTheme[0];

    if (next && next.id !== current.id) playEpisode(next);
  }

  // Lleva la reproducción a un porcentaje específico del audio.
  function seek(percent) {
    const audio = audioRef.current;
    if (!audio.duration) return;
    audio.currentTime = (percent / 100) * audio.duration;
    setCurrentTime(audio.currentTime);
    setProgress(percent);
  }

  // Obtiene los episodios guardados desde la API de persistencia.
  function getBookmarks() {
    return api.getBookmarks();
  }

  // Agrega o quita un episodio de la lista de guardados.
  function toggleBookmark(id) {
    const list = api.getBookmarks();
    const idx = list.indexOf(id);
    if (idx === -1) list.push(id);
    else list.splice(idx, 1);
    api.setBookmarks(list);
    return list;
  }

  const value = {
    audioRef,
    current,
    isPlaying,
    progress,
    currentTime,
    duration,
    playEpisode,
    pause,
    toggle,
    playNextEpisode,
    seek,
    getBookmarks,
    toggleBookmark,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export default PlayerContext;
