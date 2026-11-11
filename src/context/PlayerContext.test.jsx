import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PlayerProvider, usePlayer } from './PlayerContext.jsx';

function PlayerHarness() {
  const { current, isPlaying, toggle, playEpisode, pause, audioRef, currentTime, duration } =
    usePlayer();

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          playEpisode({
            id: 'ep-1',
            title: 'Capítulo 1',
            audioUrl: 'audio.mp3',
            learningPathTitle: 'Tema',
            lessonNumber: 1,
          })
        }
      >
        play
      </button>
      <button
        type="button"
        onClick={() =>
          playEpisode({
            id: 'ep-2',
            title: 'Capítulo 2',
            learningPathTitle: 'Fundamentos de HTML',
            lessonNumber: 2,
          })
        }
      >
        play-fallback
      </button>
      <button
        type="button"
        onClick={() =>
          playEpisode({
            id: 'ep-missing',
            title: 'Capítulo sin audio',
            audioUrl: null,
            learningPathTitle: 'Tema',
            lessonNumber: 3,
          })
        }
      >
        play-unavailable
      </button>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <button type="button" onClick={pause}>
        pause
      </button>
      <button
        type="button"
        onClick={() => {
          Object.defineProperty(audioRef.current, 'currentTime', {
            configurable: true,
            value: 65,
          });
          Object.defineProperty(audioRef.current, 'duration', {
            configurable: true,
            value: 125,
          });
          audioRef.current.dispatchEvent(new Event('timeupdate'));
          audioRef.current.dispatchEvent(new Event('durationchange'));
        }}
      >
        update-time
      </button>
      <div data-testid="status">{isPlaying ? 'playing' : 'paused'}</div>
      <div data-testid="current">{current?.title ?? 'none'}</div>
      <div data-testid="audio-src">{audioRef.current?.src ?? ''}</div>
      <div data-testid="current-time">{currentTime}</div>
      <div data-testid="duration">{duration}</div>
    </div>
  );
}

describe('PlayerContext', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLMediaElement.prototype, 'play', {
      configurable: true,
      value: vi.fn(function () {
        this._paused = false;
        this.dispatchEvent(new Event('play'));
        return Promise.resolve();
      }),
    });

    Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
      configurable: true,
      value: vi.fn(function () {
        this._paused = true;
        this.dispatchEvent(new Event('pause'));
      }),
    });

    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get() {
        return this._paused ?? true;
      },
    });
  });

  it('updates the playback state to paused when playback is paused', async () => {
    render(
      <PlayerProvider>
        <PlayerHarness />
      </PlayerProvider>
    );

    await act(async () => {
      screen.getByRole('button', { name: /^play$/i }).click();
    });

    expect(screen.getByTestId('status')).toHaveTextContent('playing');

    await act(async () => {
      screen.getByRole('button', { name: /pause/i }).click();
    });

    expect(screen.getByTestId('status')).toHaveTextContent('paused');
  });

  it('updates elapsed time and duration from media events', async () => {
    render(
      <PlayerProvider>
        <PlayerHarness />
      </PlayerProvider>
    );

    await act(async () => {
      screen.getByRole('button', { name: /update-time/i }).click();
    });

    expect(screen.getByTestId('current-time')).toHaveTextContent('65');
    expect(screen.getByTestId('duration')).toHaveTextContent('125');
  });

  it('resolves a category-based audio source when no explicit audioUrl is provided', async () => {
    render(
      <PlayerProvider>
        <PlayerHarness />
      </PlayerProvider>
    );

    await act(async () => {
      screen.getByRole('button', { name: /play-fallback/i }).click();
    });

    expect(screen.getByTestId('audio-src')).toHaveTextContent('/audios/html/ep-2.wav');
  });

  it('does not start playback for an episode explicitly marked without audio', async () => {
    render(
      <PlayerProvider>
        <PlayerHarness />
      </PlayerProvider>
    );

    await act(async () => {
      screen.getByRole('button', { name: /play-unavailable/i }).click();
    });

    expect(screen.getByTestId('current')).toHaveTextContent('none');
    expect(screen.getByTestId('audio-src')).toBeEmptyDOMElement();
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });
});
