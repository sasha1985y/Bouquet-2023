import AbstractView from '../framework/view/abstract-view.js';

const createContainerTemplate =
() => (
  '<div class="container"></div>'
);
/**
 * Класс представления который создаёт компонент представления который используется в нескольких частях приложения в качестве формообразующего
 */
export default class ContainerView extends AbstractView {

  get template() {
    return createContainerTemplate();
  }
}
