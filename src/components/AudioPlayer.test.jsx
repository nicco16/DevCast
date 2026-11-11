import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AudioPlayer from "./AudioPlayer.jsx";
import { usePlayer } from "../context/PlayerContext.jsx";

vi.mock("../context/PlayerContext.jsx", () => ({
  usePlayer: vi.fn(),
}));

describe("AudioPlayer", () => {
  const seek = vi.fn();

  beforeEach(() => {
    seek.mockClear();
    usePlayer.mockReturnValue({
      current: {
        title: "Estructura del documento HTML",
        learningPathTitle: "Fundamentos de HTML",
        coverUrl: "/cover.png",
        duration: "09:40",
      },
      isPlaying: false,
      toggle: vi.fn(),
      playNextEpisode: vi.fn(),
      progress: 25,
      currentTime: 65,
      duration: 125,
      seek,
    });
  });

  it("shows elapsed and total playback time in minutes and seconds", () => {
    render(<AudioPlayer />);

    expect(screen.getByText("1:05")).toBeInTheDocument();
    expect(screen.getByText("2:05")).toBeInTheDocument();
  });

  it("seeks to the selected position on the audio range control", () => {
    render(<AudioPlayer />);

    const slider = screen.getByRole("slider", { name: /posición de reproducción/i });
    expect(slider).toHaveValue("25");

    fireEvent.change(slider, { target: { value: "62.5" } });

    expect(seek).toHaveBeenCalledWith(62.5);
  });
});
