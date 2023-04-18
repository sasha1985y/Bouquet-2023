/**
 * Функция для обновления массива после изменения состояния одного из компонентов
 * @param {Array} items дефолтный массив
 * @param {number} update компонент, который изменил своё состояние
 * @returns {Array} новый изменённый массив
 */
function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { updateItem };
