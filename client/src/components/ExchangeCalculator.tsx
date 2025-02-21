import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchSymbols, fetchPrice, fetchFee } from "../store/exchangeThunks";
import { setSelectedSymbol, setAmount, calculateResult } from "../store/exchangeSlice";
import { currencyOptions } from "../utils/validation";
import "./ExchangeCalculator.css";

const ExchangeCalculator = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Извлекаем данные из хранилища
  const {
    symbols,
    selectedSymbol,
    price,
    fee,
    minAmount,
    maxAmount,
    amount,
    result,
    error,
  } = useSelector((state: RootState) => state.exchange);

  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  useEffect(() => {
    dispatch(fetchSymbols());
  }, [dispatch]);

  const handleSymbolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const symbol = event.target.value;
    dispatch(setSelectedSymbol(symbol));
    dispatch(fetchPrice({ symbol, currency: selectedCurrency }));
    dispatch(fetchFee());
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);
    if (selectedSymbol) {
      dispatch(fetchPrice({ symbol: selectedSymbol, currency }));
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      dispatch(setAmount(value));
    }
  };

  const handleCalculate = () => {
    dispatch(calculateResult());
  };

  // Переменная для блокировки кнопки "Рассчитать"
  const isCalculateDisabled =
    !selectedSymbol || // Учитываем пустую строку
    amount <= 0 ||
    Boolean(error) || // Приводим error к boolean
    price == null; // Покрываем случай null и undefined

  return (
    <div className="exchange-calculator-container">
      <div className="exchange-calculator">
        <h2>Калькулятор обмена</h2>

        {/* Сообщение об ошибке, если есть */}
        {error && <p className="error-message">{error}</p>}

        <label>Выберите криптовалюту:</label>
        <select onChange={handleSymbolChange} value={selectedSymbol || ""}>
          <option value="" disabled>Выберите криптовалюту</option>
          {symbols.map((pair) => (
            <option key={pair.symbol} value={pair.symbol}>
              {pair.base}
            </option>
          ))}
        </select>

        <label>Выберите валюту для конвертации:</label>
        <select onChange={handleCurrencyChange} value={selectedCurrency}>
          {currencyOptions.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </select>

        {/* Проверяем, выбран ли символ перед разбиением строки */}
        {selectedSymbol && price && (
          <p>Курс обмена: 1 {selectedSymbol.split("_")[0]} = {price} {selectedCurrency.toUpperCase()}</p>
        )}

        <label>Введите сумму:</label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min={minAmount || 0}
          max={maxAmount ?? 10000} // Если maxAmount отсутствует, ставим 10000
        />

        {minAmount && maxAmount && (
          <p>Мин: {minAmount}, Макс: {maxAmount}</p>
        )}

        {fee && <p>Комиссия: {(fee * 100).toFixed(2)}%</p>} {/* Округляем комиссию до двух знаков */}

        <button onClick={handleCalculate} disabled={isCalculateDisabled}>
          Рассчитать
        </button>

        {result !== null && (
          <p className="result-message">
            Вы получите: {result.toFixed(6)} {selectedCurrency.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExchangeCalculator;
