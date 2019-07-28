import config from '../config/config';

// TODO(mike): Automatically detect current protocol
export function appProtocol(): string {
  return 'http';
}

export function rootUrl(): string {
  return `${appProtocol()}://${config.host}`;
}

export function rootUrlWithPort(): string {
  return `${rootUrl()}:${config.port}`;
}

export function urlFor(path: string): string {
  return `${rootUrl()}${path}`;
}

export function apiUrlFor(path: string): string {
  return `${rootUrl()}/api${path}`;
}

export function urlWithPortFor(path: string): string {
  return `${rootUrlWithPort()}${path}`;
}

export function apiUrlWithPortFor(path: string): string {
  return `${rootUrlWithPort()}/api${path}`;
}
