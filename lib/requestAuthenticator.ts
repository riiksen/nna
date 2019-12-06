import { sign as signJWT, verify as verifyJWT } from 'jsonwebtoken';

import { config } from '@config/config';

interface TokenPayload {
  type: 'refresh' | 'access';
  id: number;
}

export function getRefreshTokenPayload(refreshToken: string): TokenPayload | null {
  try {
    const payload = verifyJWT(
      refreshToken,
      config.jwtSecret,
    ) as TokenPayload;

    if (payload.type !== 'refresh') {
      return null;
    }

    return payload;
  } catch (e) {
    return null;
  }
}

export function signAccessFromRefreshToken(payload: TokenPayload): string | null {
  if (payload.type !== 'refresh') {
    return null;
  }

  const accessToken = signJWT({
    type: 'access',
    id: payload.id,
  },
  config.jwtSecret,
  { expiresIn: 30 });

  return accessToken;
}

export function signRefreshToken(id: number): string {
  const payload: TokenPayload = {
    type: 'refresh',
    id,
  };

  const refreshToken = signJWT(payload, config.jwtSecret, { expiresIn: '30 days' });

  return refreshToken;
}

export function checkAccessToken(accessToken: string): boolean {
  try {
    const payload = verifyJWT(
      accessToken,
      config.jwtSecret,
    ) as TokenPayload;

    if (payload.type !== 'access') {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}
