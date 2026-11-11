import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { episodes, learningPaths, categories } from '../data/mockData.js';

function listFilesRecursive(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFilesRecursive(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

describe('Audio files validation', () => {
  const publicDir = path.resolve(process.cwd(), 'public');
  const audiosDir = path.join(publicDir, 'audios');

  it('every episode has a unique id and valid metadata', () => {
    const ids = new Set();
    const covers = new Set();
    for (const ep of episodes) {
      expect(ep.id, `episode must have id: ${JSON.stringify(ep)}`).toBeTruthy();
      expect(ep.title, `episode ${ep.id} must have title`).toBeTruthy();
      expect(ep.learningPathTitle || ep.category, `episode ${ep.id} must have learningPath or category`).toBeTruthy();
      expect(ep.duration, `episode ${ep.id} must have duration`).toBeTruthy();
      expect(
        ep.audioUrl === null || typeof ep.audioUrl === 'string',
        `episode ${ep.id} must have an audioUrl or null`
      ).toBe(true);

      expect(ids.has(ep.id)).toBe(false);
      ids.add(ep.id);
      expect(ep.coverUrl, `episode ${ep.id} must have a cover`).toBeTruthy();
      expect(covers.has(ep.coverUrl), `episode ${ep.id} must have a unique cover`).toBe(false);
      covers.add(ep.coverUrl);
    }
  });

  it('only HTML has existing learning progress', () => {
    expect(categories.find((category) => category.slug === 'html').progressPercent).toBe(20);
    expect(categories.find((category) => category.slug === 'css').progressPercent).toBe(0);
    expect(categories.find((category) => category.slug === 'javascript').progressPercent).toBe(0);
    expect(learningPaths.find((path) => path.id === 'html-fundamentals').progressPercent).toBe(20);
    expect(learningPaths.find((path) => path.id === 'css-fundamentals').progressPercent).toBe(0);
    expect(learningPaths.find((path) => path.id === 'js-fundamentals').progressPercent).toBe(0);
  });

  it('audioUrl paths are unique and point to existing files', () => {
    const filtered = episodes.map((e) => e.audioUrl).filter(Boolean);
    const set = new Set(filtered);
    expect(set.size).toBe(filtered.length);

    for (const p of filtered) {
      const rel = p.replace(/^\/*audios\/*/, '');
      const full = path.join(audiosDir, rel);
      const exists = fs.existsSync(full);
      expect(exists, `audio file missing: ${full}`).toBe(true);
      expect(fs.statSync(full).size, `audio file is empty: ${full}`).toBeGreaterThan(0);
    }
  });

  it('no orphan audio files in public/audios', () => {
    if (!fs.existsSync(audiosDir)) {
      // If directory doesn't exist, fail to alert maintainer
      expect(false).toBe(true);
      return;
    }

    const allFiles = listFilesRecursive(audiosDir).filter((f) => /\.(mp3|wav)$/i.test(f));
    const referenced = new Set(
      episodes
        .map((e) => e.audioUrl)
        .filter(Boolean)
        .map((u) => path.join(audiosDir, u.replace(/^\/*audios\/*/, '')))
    );

    for (const f of allFiles) {
      expect(referenced.has(f), `orphan audio file found: ${f}`).toBe(true);
    }
  });

  it('learningPaths and categories counts are consistent', () => {
    // Check learningPaths episodes exist and counts match totalLessons
    for (const lp of learningPaths) {
      if (Array.isArray(lp.episodes)) {
        expect(lp.episodes.length).toBe(lp.totalLessons);
        for (const epId of lp.episodes) {
          const found = episodes.find((e) => e.id === epId);
          expect(found, `learningPath ${lp.id} references missing episode ${epId}`).toBeTruthy();
        }
      }
    }

    // Check categories totalEpisodes matches sum of learningPaths in that category
    for (const cat of categories) {
      const lps = learningPaths.filter((lp) => lp.category === cat.title);
      const totalFromLPs = lps.reduce((s, lp) => s + (Array.isArray(lp.episodes) ? lp.episodes.length : 0), 0);
      expect(cat.totalEpisodes, `${cat.slug} totalEpisodes mismatch`).toBe(totalFromLPs);
    }
  });
});
