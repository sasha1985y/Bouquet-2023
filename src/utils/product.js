function getWeightForNullPrice(numberA, numberB) {
  if (numberA === null && numberB === null) {
    return 0;
  }

  if (numberA === null) {
    return 1;
  }

  if (numberB === null) {
    return -1;
  }

  return null;
}

/**
 * Функция для сортировки по цене на увеличение
 * @param {number} productA объект А
 * @param {number} productB объект Б
 * @returns {number} разница между объект А и объект Б
 */
function sortPriceUp(productA, productB) {
  const weight = getWeightForNullPrice(productA.price, productB.price);

  return weight ?? (productA.dueDate).diff((productB.price));
}
/**
 * Функция для сортировки по цене на уменьшение
 * @param {number} productA объект А
 * @param {number} productB объект Б
 * @returns {number} разница между объект А и объект Б
 */
function sortPriceDown(productA, productB) {
  const weight = getWeightForNullPrice(productA.price, productB.price);

  return weight ?? (productB.price).diff((productA.price));
}

export { sortPriceUp, sortPriceDown };
