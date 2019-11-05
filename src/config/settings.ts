interface Settings {
  coins_to_usd_rate: number;
  levels: {
    max: number;
    multiplier: number;
  };
}

const settings: Settings = {
  coins_to_usd_rate: 1000,
  levels: {
    max: 100,
    multiplier: 1.3,
  },
};

export default settings;
