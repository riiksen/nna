import { clamp } from './math.helper';
import settings from '../config/settings';

export function getXp(level: number): number {
  return Math.floor((settings.levels.multiplier ** level) * settings.coinsToUSDRate);
}

export function getXpToNextLevel(level: number): number {
  if (level === settings.levels.max) return 0;

  return Math.floor(getXp(level + 1) - getXp(level));
}

export function getLevel(xp: number): number {
  const level = Math.floor(Math.log(xp / settings.coinsToUSDRate)
    / Math.log(settings.levels.multiplier));

  return clamp(level, 0, settings.levels.max);
}
