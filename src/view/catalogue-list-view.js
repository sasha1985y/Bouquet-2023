import AbstractView from '../framework/view/abstract-view.js';

const createCatalogueListTemplate =
() => (
  '<ul class="catalogue__list"></ul>'
);
/**
 * Класс представления который создаёт компонент представления пустого списка для рендера карточек букетов
 */
export default class CatalogueListView extends AbstractView {

  get template() {
    return createCatalogueListTemplate();
  }
}
