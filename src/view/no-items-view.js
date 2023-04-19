import AbstractView from '../framework/view/abstract-view.js';

const createCatalogueNoItemsTemplate =
() => (
  `<div class="message catalogue__no-items">
    <p class="text text--align-center message__text">Извините, по вашему запросу букетов не найдено</p>
  </div>`
);
/**
 * Класс представления который создаёт компонент представления сообщения при отсутствии данных с сервера
 */
export default class NoItemsView extends AbstractView {

  get template() {
    return createCatalogueNoItemsTemplate();
  }
}
