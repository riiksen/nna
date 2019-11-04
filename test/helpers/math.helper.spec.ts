import { expect } from '../utils';

import * as mathHelper from '../../src/helpers/math.helper';

describe('Math Helper', (): void => {
  describe('#mathClmap', (): void => {
    it('Returns clamped value', () => {
      expect(mathHelper.clamp(10, 1, 5)).to.equal(5);
    });
  });
});