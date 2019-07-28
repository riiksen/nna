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

export function urlFor(address: string): string {
  return `${rootUrl()}${address}`;
}

export function apiUrlFor(address: string): string {
  return `${rootUrl()}/api${address}`;
}

export function urlWithPortFor(address: string): string {
  return `${rootUrlWithPort()}${address}`;
}

export function apiUrlWithPortFor(address: string): string {
  return `${rootUrlWithPort()}/api${address}`;
}
