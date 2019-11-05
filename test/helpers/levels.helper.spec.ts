import * as levelsHelper from '../../src/helpers/levels.helper';
import settings from '../../src/config/settings';
import { expect } from '../utils';

describe('Level Helper', (): void => {
  const firstLevelXp = settings.coinsToUSDRate * settings.levels.multiplier;
  const secondLevelXp = firstLevelXp * settings.levels.multiplier;

  describe('#getXp', (): void => {
    it('Return xp from level', (): void => {
      expect(levelsHelper.getXp(1)).to.equal(firstLevelXp);
    });
  });

  describe('#getXpToNextLevel', (): void => {
    it('Return xp to next level', (): void => {
      expect(levelsHelper.getXpToNextLevel(1)).to.equal(secondLevelXp - firstLevelXp);
    });
  });

  describe('#getLevel', (): void => {
    it('Return level from xp', (): void => {
      expect(levelsHelper.getLevel(firstLevelXp)).to.equal(1);
    });
  });
});
