import * as mathHelper from '@app/helpers/math.helper';

describe('Math Helper', (): void => {
  describe('#clamp', (): void => {
    it('Returns clamped value', (): void => {
      expect(mathHelper.clamp(10, 1, 5)).toEqual(5);
      expect(mathHelper.clamp(-2, 1, 5)).toEqual(1);
      expect(mathHelper.clamp(3, 1, 5)).toEqual(3);
    });
  });
});
