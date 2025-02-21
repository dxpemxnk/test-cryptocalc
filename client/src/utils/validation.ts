import { CurrencyOption } from "../types/cryptoTypes";

export const supportedCurrencies = ["usd", "eur", "gbp", "jpy", "eth", "btc"];

export const currencyOptions: CurrencyOption[] = supportedCurrencies.map((currency) => ({
  value: currency,
  label: currency.toUpperCase(),
}));