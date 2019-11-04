import settingsJSON from "./settings.json";

interface Settings {
  levels: {
    max_level: number;
    level_multiplier: number;
  };
}

const settings: Settings = settingsJSON;

export default settings;