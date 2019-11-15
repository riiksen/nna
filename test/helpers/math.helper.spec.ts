import * as mathHelper from '@app/helpers/math.helper';
import { expect } from '../utils';

describe('Math Helper', (): void => {
  describe('#clmap', (): void => {
    it('Returns clamped value', (): void => {
      expect(mathHelper.clamp(10, 1, 5)).to.equal(5);
      expect(mathHelper.clamp(-2, 1, 5)).to.equal(1);
      expect(mathHelper.clamp(3, 1, 5)).to.equal(3);
    });
  });
});
