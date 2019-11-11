import * as levelsHelper from '../../src/helpers/levels.helper';
import settings from '../../src/config/settings';
import { expect } from '../utils';

describe('Level Helper', (): void => {

  describe('#getXp', (): void => {
    it('Return xp from level', (): void => {
      expect(levelsHelper.getXp(-1)).to.equal(0);
      
      for (var i = 1; i <= 3; i++) {
        let xp = Math.floor((settings.levels.multiplier ** (i - 1)) * settings.coinsToUSDRate);
        if(i <= 1) xp = 0;
        
        expect(levelsHelper.getXp(i)).to.equal(xp);
      }
      
      expect(levelsHelper.getXp(settings.levels.max + 1)).to.equal(levelsHelper.maxLevelXp);
    });
  });

  describe('#getXpToNextLevel', (): void => {
    it('Return xp to next level', (): void => {
      for (var i = 1; i <= 3; i++) {
        expect(levelsHelper.getXpToNextLevel(i)).to.equal(levelsHelper.getXp(i + 1) - levelsHelper.getXp(i));
      }
      expect(levelsHelper.getXpToNextLevel(settings.levels.max)).equal(0);
    });
  });

  describe('#getLevel', (): void => {
    it('Return level from xp', (): void => {
      for (var i = 1; i <= 3; i++) {
        expect(levelsHelper.getLevel(levelsHelper.getXp(i))).to.equal(i);
      }

      const xpOfMaxLevelPlusOne = levelsHelper.maxLevelXp * settings.levels.multiplier;

      expect(levelsHelper.getLevel(xpOfMaxLevelPlusOne)).to.equal(settings.levels.max);
    });
  });
});
