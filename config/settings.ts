interface Settings {
  coinsToUSDRate: number;
  levels: {
    max: number;
    multiplier: number;
  };
}

const settings: Settings = {
  coinsToUSDRate: 1000,
  levels: {
    max: 100,
    multiplier: 1.3,
  },
};

export default settings;
