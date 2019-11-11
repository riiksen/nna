import { clamp } from './math.helper';
import settings from '../config/settings';

const maxLevelXp = Math.floor((settings.levels.multiplier ** (settings.levels.max - 1)) * settings.coinsToUSDRate);

export function getXp(level: number): number {
  if(level <= 1) return 0;

  const xp = Math.floor((settings.levels.multiplier ** (level - 1)) * settings.coinsToUSDRate);

  return clamp(xp, 0, maxLevelXp);
}

export function getXpToNextLevel(level: number): number {
  if (level === settings.levels.max) return 0;

  return Math.floor(getXp(level + 1) - getXp(level));
}

export function getLevel(xp: number): number {
  const level = Math.floor(Math.log(xp / settings.coinsToUSDRate)
    / Math.log(settings.levels.multiplier)) + 1;

  return clamp(level, 1, settings.levels.max);
}

export { maxLevelXp };