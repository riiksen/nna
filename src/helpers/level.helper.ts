import { clamp } from './math.helper';
import settings from '../config/settings';

export function getXp(level: number): number {
  return Math.floor(Math.pow(settings.levels.multiplier, level) * settings.coins_to_usd_rate);
}

export function getLevel(xp: number): number {
  const level = Math.floor(Math.log(xp / settings.coins_to_usd_rate) / Math.log(settings.levels.multiplier));
  return clamp(level, 0, settings.levels.max);
}