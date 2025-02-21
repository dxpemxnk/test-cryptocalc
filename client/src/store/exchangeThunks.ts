// src/store/exchangeThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setSymbols,
  setPrice,
  setFee,
  setLimits,
  setError,
} from "./exchangeSlice";
import axiosInstance from "../axiosInstance";
import { CoinMarketData, PriceResponse } from "../types/cryptoTypes"; // Импорт типов

/**
 * Получение списка доступных криптовалют
 */
export const fetchSymbols = createAsyncThunk(
  "exchange/fetchSymbols",
  async (_, { dispatch }) => {
    try {
      // Запрашиваем список монет с API
      const response = await axiosInstance.get<CoinMarketData[]>(
        "/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
          },
        }
      );

      // Преобразуем данные в нужный формат
      const symbols = response.data.map((coin) => ({
        symbol: coin.id, // Название монеты
        base: coin.symbol.toUpperCase(), // Символ монеты (BTC, ETH и т.д.)
        quote: "usd", // Валюта обмена (по умолчанию USD)
      }));

      dispatch(setSymbols(symbols));
    } catch (error) {
      console.error("Ошибка при загрузке валютных пар:", error);
      dispatch(setError("Не удалось загрузить валютные пары"));
    }
  }
);

/**
 * Получение курса обмена для выбранной валютной пары
 */
export const fetchPrice = createAsyncThunk(
  "exchange/fetchPrice",
  async (
    payload: string | { symbol: string; currency: string },
    { dispatch }
  ) => {
    try {
      let base: string;
      let quote: string;

      // Определяем формат переданных данных
      if (typeof payload === "string") {
        base = payload;
        quote = "usd"; // По умолчанию используем USD
      } else {
        base = payload.symbol;
        quote = payload.currency;
      }

      // Запрашиваем курс обмена
      const response = await axiosInstance.get<PriceResponse>("/simple/price", {
        params: {
          ids: base,
          vs_currencies: quote,
        },
      });

      // Проверяем наличие данных
      const price = response.data?.[base]?.[quote];
      if (typeof price !== "number") {
        throw new Error("Некорректный формат ответа API");
      }

      console.log("API Response:", response.data);
      dispatch(setPrice(price));
    } catch (error) {
      console.error("Ошибка при загрузке курса:", error);
      dispatch(setError("Не удалось загрузить курс обмена"));
    }
  }
);

/**
 * Получение комиссии и лимитов
 */
export const fetchFee = createAsyncThunk(
  "exchange/fetchFee",
  async (_, { dispatch }) => {
    try {
      dispatch(setFee(0.01)); // Фиксированная комиссия 1%
      dispatch(
        setLimits({
          min: 1, // Минимальная сумма обмена
          max: 10000, // Максимальная сумма обмена
        })
      );
    } catch (error) {
      console.error("Ошибка при загрузке комиссии:", error);
      dispatch(setError("Не удалось загрузить данные о комиссии"));
    }
  }
);
