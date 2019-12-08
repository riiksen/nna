import * as levelsHelper from '@app/helpers/levels.helper';
import settings from '@config/settings';

describe('Level Helper', (): void => {
  describe('#getXp', (): void => {
    it('Return xp from level', (): void => {
      expect(levelsHelper.getXp(-1)).toEqual(0);

      for (let i = 1; i <= 3; i += 1) {
        let xp = Math.floor((settings.levels.multiplier ** (i - 1)) * settings.coinsToUSDRate);
        if (i <= 1) xp = 0;

        expect(levelsHelper.getXp(i)).toEqual(xp);
      }

      expect(levelsHelper.getXp(settings.levels.max + 1)).toEqual(levelsHelper.maxLevelXp);
    });
  });

  describe('#getXpToNextLevel', (): void => {
    it('Return xp to next level', (): void => {
      for (let i = 1; i <= 3; i += 1) {
        const xpToNextLevel = levelsHelper.getXp(i + 1) - levelsHelper.getXp(i);
        expect(levelsHelper.getXpToNextLevel(i)).toEqual(xpToNextLevel);
      }
      expect(levelsHelper.getXpToNextLevel(settings.levels.max)).toEqual(0);
    });
  });

  describe('#getLevel', (): void => {
    it('Return level from xp', (): void => {
      for (let i = 1; i <= 3; i += 1) {
        expect(levelsHelper.getLevel(levelsHelper.getXp(i))).toEqual(i);
      }

      const xpOfMaxLevelPlusOne = levelsHelper.maxLevelXp * settings.levels.multiplier;

      expect(levelsHelper.getLevel(xpOfMaxLevelPlusOne)).toEqual(settings.levels.max);
    });
  });
});
