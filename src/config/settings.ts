import * as fs from 'fs';

const settingsJSON = fs.readFileSync('./settings.json', 'utf8');

interface Settings {
  coins_to_usd_rate: number,
  levels: {
    max: number;
    multiplier: number;
  };
}

const settings: Settings = JSON.parse(settingsJSON);

export default settings;