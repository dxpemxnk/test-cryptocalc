export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
}

export const supportedCurrencies = ["usd", "eur", "gbp", "jpy", "eth", "btc"];

export interface CurrencyOption {
  value: string;
  label: string;
}

export interface PriceResponse {
  [key: string]: {
    [key: string]: number;
  };
}
