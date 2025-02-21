import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем интерфейс состояния
interface ExchangeState {
  symbols: { symbol: string; base: string; quote: string }[]; // Доступные валютные пары
  selectedSymbol: string | null; // Выбранная валютная пара
  price: number | null; // Текущий курс обмена
  fee: number | null; // Комиссия за обмен
  minAmount: number | null; // Минимальная сумма
  maxAmount: number | null; // Максимальная сумма
  amount: number; // Введенная сумма
  result: number | null; // Итоговая сумма после расчета
  error: string | null; // Сообщение об ошибке
}

// Начальное состояние
const initialState: ExchangeState = {
  symbols: [],
  selectedSymbol: null,
  price: null,
  fee: null,
  minAmount: null,
  maxAmount: null,
  amount: 0,
  result: null,
  error: null,
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    // Устанавливает список валютных пар
    setSymbols: (state, action: PayloadAction<ExchangeState["symbols"]>) => {
      state.symbols = action.payload;
    },

    // Устанавливает выбранную валютную пару
    setSelectedSymbol: (state, action: PayloadAction<string>) => {
      state.selectedSymbol = action.payload;
    },

    // Устанавливает текущий курс обмена
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },

    // Устанавливает комиссию за обмен
    setFee: (state, action: PayloadAction<number>) => {
      state.fee = action.payload;
    },

    // Устанавливает минимальную и максимальную сумму для обмена
    setLimits: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.minAmount = action.payload.min;
      state.maxAmount = action.payload.max;
    },

    // Устанавливает сумму обмена и проверяет на соответствие лимитам
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
      const min = state.minAmount ?? 0;
      const max = state.maxAmount ?? 10000;

      if (state.amount < min) {
        state.error = `Минимальная сумма: ${min}`;
      } else if (state.amount > max) {
        state.error = `Максимальная сумма: ${max}`;
      } else {
        state.error = null;
      }
    },

    // Устанавливает сообщение об ошибке
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Вычисляет результат обмена
    calculateResult: (state) => {
      if (state.price !== null && state.fee !== null && state.amount > 0) {
        state.result = state.amount * state.price * (1 - state.fee);
      } else {
        state.result = null;
      }
    },
  },
});

export const {
  setSymbols,
  setSelectedSymbol,
  setPrice,
  setFee,
  setLimits,
  setAmount,
  setError,
  calculateResult,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
