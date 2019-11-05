import * as levelHelper from '../../src/helpers/level.helper';
import settings from '../../src/config/settings';
import { expect } from '../utils';

describe('Level Helper', (): void => {
  const firstLevelXp = settings.coinsToUSDRate * settings.levels.multiplier;

  describe('#getXp', (): void => {
    it('Return xp from level', (): void => {
      expect(levelHelper.getXp(1)).to.equal(firstLevelXp);
    });
  });

  describe('#getLevel', (): void => {
    it('Return level from xp', (): void => {
      expect(levelHelper.getLevel(firstLevelXp)).to.equal(1);
    });
  });
});
