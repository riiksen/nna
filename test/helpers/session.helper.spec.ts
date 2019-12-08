import * as sessionHelper from '@app/helpers/session.helper';

describe('Session Helper', (): void => {
  describe('#validProvider', (): void => {
    it('returns true for valid provider', async (): Promise<void> => {
      expect(sessionHelper.validProvider('steam')).toEqual(true);
    });

    it('returns false for invalid provider', async (): Promise<void> => {
      expect(sessionHelper.validProvider('definitly_not_valid_provider')).toEqual(false);
    });
  });
});
