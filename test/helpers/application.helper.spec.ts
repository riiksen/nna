import { expect } from '../utils';

import * as applicationHelper from '@app/helpers/application.helper';

import { config } from '@config/config';

describe('Application Helper', (): void => {
  // TODO(mike): Implement this
  describe('#appProtocol', (): void => {
    it('it returns https if supported otherwise http', async (): Promise<void> => {

    });
  });

  describe('#apiUrlWithPortFor', (): void => {
    it('returns a correct api url with port', async (): Promise<void> => {
      expect(applicationHelper.apiUrlWithPortFor('/test_url')).to.be.oneOf([
        `http://${config.host}:${config.port}/api/test_url`,
        `https://${config.host}:${config.port}/api/test_url`,
      ]);
    });
  });

  describe('#urlWithPortFor', (): void => {
    it('returns a correct url with port', async (): Promise<void> => {
      expect(applicationHelper.urlWithPortFor('/test_url')).to.be.oneOf([
        `http://${config.host}:${config.port}/test_url`,
        `https://${config.host}:${config.port}/test_url`,
      ]);
    });
  });

  describe('#rootUrl', (): void => {
    it('returns a website url without any path', async (): Promise<void> => {
      expect(applicationHelper.rootUrl()).to.be.oneOf([
        `http://${config.host}`,
        `https://${config.host}`,
      ]);
    });
  });

  describe('#rootUrlWithPort', (): void => {
    it('returns a website url without any path with port', async (): Promise<void> => {
      expect(applicationHelper.rootUrlWithPort()).to.be.oneOf([
        `http://${config.host}:${config.port}`,
        `https://${config.host}:${config.port}`,
      ]);
    });
  });

  describe('#urlFor', (): void => {
    it('returns a correct url for given path', async (): Promise<void> => {
      expect(applicationHelper.urlFor('/test_url')).to.be.oneOf([
        `http://${config.host}/test_url`,
        `https://${config.host}/test_url`,
      ]);
    });
  });

  describe('#apiUrlFor', (): void => {
    it('it returns a correct api url for giver path', async (): Promise<void> => {
      expect(applicationHelper.apiUrlFor('/test_url')).to.be.oneOf([
        `http://${config.host}/api/test_url`,
        `https://${config.host}/api/test_url`,
      ]);
    });
  });
});
