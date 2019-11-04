const AVAILABLE_PROVIDERS = [
  'steam',
];

export function validProvider(provider: string): boolean {
  return AVAILABLE_PROVIDERS.includes(provider);
}
