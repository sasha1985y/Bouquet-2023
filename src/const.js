/** @enum {string} Перечисление возможных режимов приложения
 * @param {string} INIT режим инициализации приложения
*/
const UpdateType = {
  INIT: 'INIT'
};
/** @enum {string} Перечисление возможных режимов сортировки по цене товара
 * @param {string} DEFAULT режим по умолчанию
 * @param {string} PRICE_DOWN режим сортировки по цене на уменьшение
 * @param {string} PRICE_UP режим сортировки по цене на увеличение
 */
const SortType = {
  DEFAULT: 'default',
  PRICE_DOWN: 'date-down',
  PRICE_UP: 'date-up'
};

export { UpdateType, SortType };
