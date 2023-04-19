/**
 * @enum {string} Перечисление возможных режимов приложения
 * @param {string} INIT режим инициализации приложения
*/
const UpdateType = {
  INIT: 'INIT'
};
/**
 * @enum {string} Перечисление возможных режимов сортировки по цене товара
 * @param {string} DEFAULT режим по умолчанию
 * @param {string} PRICE_DOWN режим сортировки по цене на уменьшение
 * @param {string} PRICE_UP режим сортировки по цене на увеличение
 */
const SortType = {
  DEFAULT: 'default',
  PRICE_DOWN: 'date-down',
  PRICE_UP: 'date-up'
};
/**
 * @enum {string} Перечисление возможных режимов фильтрации по причине подарка
 * @param {string} ALL режим фильтрации по умолчанию
 * @param {string} BIRHDAYBOY режим фильтрации для именинников
 * @param {string} BRIDGE режим фильтрации для невест
 * @param {string} MOTHERDAY режим фильтрации маме
 * @param {string} COLLEAGUES режим фильтрации коллегам
 * @param {string} FORLOVE режим фильтрации для любимой
 */
const ReasonType = {
  ALL: 'All',
  BIRHDAYBOY: 'birthdayboy',
  BRIDGE: 'bridge',
  MOTHERDAY: 'motherday',
  COLLEAGUES: 'colleagues',
  FORLOVE: 'forlove'
};

/**
 * @enum {string} Перечисление возможных режимов фильтрации по цвету
 * @param {string} COLORS режим фильтрации по умолчанию
 * @param {string} RED режим фильтрации по красному цвету
 * @param {string} WHITE режим фильтрации по белому цвету
 * @param {string} VIOLET режим фильтрации по фиолетовому цвету
 * @param {string} YELLOW режим фильтрации по желтому цвету
 * @param {string} PINK режим фильтрации по розовому цвету
 * @param {string} EMPTY режим неактивного фильтра
 */
const ColorType = {
  COLORS: 'all',
  RED: 'red',
  WHITE: 'white',
  VIOLET: 'violet',
  YELLOW: 'yellow',
  PINK: 'pink',
  EMPTY: 'empty'
};

export { UpdateType, SortType, ReasonType, ColorType };
