import AbstractView from '../framework/view/abstract-view.js';

const createCatalogueTemplate =
() => (
  '<div class="catalogue" data-items="catalogue"></div>'
);
/**
 * Класс представления который создаёт компонент представления, содержащий контейнер с представлениями каталога приложения
 */
export default class CatalogueView extends AbstractView {

  get template() {
    return createCatalogueTemplate();
  }
}
