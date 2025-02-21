# test-cryptocalc

### Как бы ты валидировал пользовательский ввод в полях ввода?

1. **Типизация данных:** Валюта и сумма обмена — это два основных поля ввода. Сумма обмена валидируется как положительное число, а валюта — как одна из поддерживаемых валют. Я контролирую это через типы данных и условные проверки.
2. **Проверка минимальной и максимальной суммы:** Я определил минимальные и максимальные значения для обмена и проверяю их перед выполнением расчета. Например, если сумма обмена ниже минимального порога или выше максимального, выводится ошибка.
3. **Проверка формата валюты:** Пользователь может выбрать валюту из выпадающего списка (например, USD, EUR, BTC и т.д.), что исключает ошибочный ввод.
4. **Обратная связь:** Ошибки валидации отображаются пользователю сразу при вводе данных, что позволяет быстро исправить ошибки.

### Если бы надо было бы использовать кастомные формулы расчета, как бы ты сделал их поддержку?

1. **Динамические формулы:** Я использую параметры комиссии и минимальные/максимальные суммы, которые можно легко менять в коде и передавать в расчет. Эти данные могут быть получены через API, а затем использоваться для кастомных расчетов, например, добавление комиссии на каждую транзакцию.
2. **Интерфейс для формул:** Я создал объект, который содержит валюту и коэффициент комиссии, чтобы можно было легко изменять формулы в будущем.
3. **Проверка на ошибки:** Кастомные формулы защищены от деления на ноль и других математических ошибок с помощью валидации значений перед расчетами.

### Как бы ты реализовал функциональность калькулятора, чтобы он мог учитывать информацию о комиссии, минимальные и максимальные суммы обмена?

Для учета комиссии и лимитов в калькуляторе я использовал следующие подходы:

1. **Комиссия:** Можно задать фиксированную комиссию в коде. Комиссия добавляется к вычисленной сумме обмена перед ее выводом пользователю.
2. **Минимальные и максимальные суммы:** Минимальные и максимальные значения для обмена валидируются при каждом расчете. Например, если сумма обмена меньше минимальной или больше максимальной, пользователь получает сообщение об ошибке и не может продолжить обмен.
3. **Обновление UI:** После того как пользователь вводит данные и выбирает валюту, калькулятор сразу учитывает комиссию и ограничения, обновляя результат в реальном времени. Это помогает пользователю видеть точную сумму обмена с учетом всех условий.

### Как бы ты получал актуальную информацию о комиссии?

1. **Через API (CoinGecko):** Я интегрировал запросы к внешнему API, чтобы получать актуальные данные о курсах валют и комиссии для обмена. Эти данные могут обновляться автоматически по мере необходимости.

### Как бы ты обрабатывал ошибки, если что-то пошло не так (данные не загрузились или возникли 5xx-е ошибки)?

Для обработки ошибок я применяю следующие методы:

1. **Обработка ошибок при запросах API:** Я обрабатываю все ошибки, которые могут возникнуть при запросах к внешнему API, с использованием `try-catch`. Например, если происходит ошибка с кодом 5xx или ошибка сети, выводится сообщение об ошибке, и пользователь может повторить попытку.
2. **Показ ошибок пользователю:** В случае неудачной загрузки данных (например, 5xx ошибки или ошибка сети) калькулятор показывает пользователю сообщение об ошибке, например, "Не удалось загрузить данные."
3. **Логирование ошибок:** Ошибки, которые возникают в процессе работы с API или при расчете данных, логируются для анализа и устранения проблем в будущем.

### Как бы ты протестировал функциональность калькулятора?

Для тестирования функциональности калькулятора обмена криптовалюты я использовал следующие подходы:

1. **Юнит-тесты:** Тестирование отдельных функций, например, вычисления суммы обмена с учетом комиссии, валидации ввода и корректности работы с формулами. Для этого можно использовать библиотеку `Jest`.
