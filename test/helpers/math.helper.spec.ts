import { expect } from '../utils';

import * as mathHelper from '../../src/helpers/math.helper';

describe('Math Helper', (): void => {
  describe('#mathClmap', (): void => {
    it('Returns clamped value', (): void => {
      expect(mathHelper.clamp(10, 1, 5)).to.equal(5);
      expect(mathHelper.clamp(-2, 1, 5)).to.equal(1);
      expect(mathHelper.clamp(3, 1, 5)).to.equal(3);
    });
  });
});
