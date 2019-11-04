import settingsJSON from "./settings.json";

interface Settings {
  coins_to_usd_rate: number,
  levels: {
    max: number;
    multiplier: number;
  };
}

const settings: Settings = settingsJSON;

export default settings;