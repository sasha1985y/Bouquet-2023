import { render, remove } from '../framework/render.js';
import UpdateType from '../const.js';
import HeaderContainerView from '../view/header-container-view.js';
import PopupDefferedView from '../view/popup-deffered-view.js';
import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages-view.js';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import CatalogueView from '../view/catalogue-view.js';
import ContainerView from '../view/container-view.js';
import CatalogueHeaderView from '../view/catalogue-header-view.js';
import CatalogueListView from '../view/catalogue-list-view.js';
import CatalogueBtnWrapView from '../view/catalogue-btn-wrap-view.js';
import CatalogueShowMoreBtnView from '../view/catalogue-show-more-btn-view.js';
import ProductPresenter from './product-presenter.js';
import NoItemsView from '../view/no-items-view.js';
//import {updateItem} from '../utils/common.js';

/** @const {number} константа количества отображаемых за раз карточек */
const PRODUCT_COUNT_PER_STEP = 3;

export default class ContentPresenter {
  /**@type {Array} данные с сервера */
  #productsModel = null;
  /** @type {HTMLElement} элемент разметки где расположено содержимое страницы class="main" */
  #appMainContainer = null;
  /** @type {HTMLElement} элемент разметки для рендера расширенной версии карточки букета class="modal-product" */
  #appPopupContainer = null;
  /** @type {HTMLElement} элемент разметки, содержащий элементы шапки приложения class="header__wrapper" */
  #appHeaderWrapperContainer = null;
  /** @type {HTMLElement} компонент представления который открывает попап с отложенными букетами */
  #headerHandlerComponent = null;
  /** @type {HTMLElement} компонент представления попапа для отложенных букетов */
  #popupDefferedComponent = null;
  /** @type {HTMLElement} элемент разметки в который рендерится попап с отложенными букетами class="deffered-content" */
  #appPopupDefferedContainer = null;
  /** @type {HTMLElement} компонент представления кнопки допоказа карточек букетов */
  #catalogueShowMoreBtnComponent = null;
  /** @type {HTMLElement} компонент представления вступительного краткого охарактеризования компании */
  #heroComponent = new HeroView();
  /** @type {HTMLElement} компонент представления вступительного тезиса компании */
  #missionComponent = new MissionView();
  /** @type {HTMLElement} компонент представления преимуществ компании */
  #advantagesComponent = new AdvantagesView();
  /** @type {HTMLElement} компонент представления выбора человека, которому подарят букет */
  #filterReasonComponent = null;
  /** @type {HTMLElement} компонент представления выбора цветовой гаммы букета */
  #filterColorComponent = new FilterColorView();
  /** @type {HTMLElement} компонент представления, содержащий контейнер с представлениями каталога приложения */
  #catalogueComponent = new CatalogueView();
  /** @type {HTMLElement} компонент представления который используется в нескольких частях приложения в качестве формообразующего */
  #containerComponent = new ContainerView();
  /** @type {HTMLElement} компонент представления заголовка каталога */
  #catalogueHeaderComponent = new CatalogueHeaderView();
  /** @type {HTMLElement} компонент представления пустого списка для рендера карточек букетов */
  #catalogueListComponent = new CatalogueListView();
  /** @type {HTMLElement} компонент представления кнопки допоказа карточек букетов */
  #catalogueBtnWrapComponent = new CatalogueBtnWrapView();
  /** @type {HTMLElement} компонент представления сообщения при отсутствии данных с сервера */
  #noItemsComponent = new NoItemsView();
  /** @type {Array} копия данных с сервера */
  #contentProducts = [];
  /** @const {number} счётчик отрисованных карточек */
  #renderedProductCount = PRODUCT_COUNT_PER_STEP;
  /** @type {Map} свойство, где ContentPresenter будет хранить ссылки на все Product-презентеры */
  #productPresenter = new Map();

  constructor({
    productsModel,
    appMainContainer,
    appPopupContainer,
    appHeaderWrapperContainer,
    appPopupDefferedContainer
  }) {
    this.#productsModel = productsModel;
    this.#productsModel.addObserver(this.#handleModelEvent);
    this.#appMainContainer = appMainContainer;
    this.#appPopupContainer = appPopupContainer;
    this.#appHeaderWrapperContainer = appHeaderWrapperContainer;
    this.#appPopupDefferedContainer = appPopupDefferedContainer;
  }

  #handleModelEvent = (updateType) => {
    if(updateType === UpdateType.INIT) {
      this.#contentProducts = [...this.#productsModel.products];

      this.#headerHandlerComponent = new HeaderContainerView({
        onHeaderCountBtnClick: () => {
          this.#popupDefferedComponent = new PopupDefferedView({
            onDefferedClose: () => {
              remove(this.#popupDefferedComponent, this.#appPopupDefferedContainer);
            }
          });
          render(this.#popupDefferedComponent, this.#appPopupDefferedContainer);
        }
      });
      render(this.#headerHandlerComponent, this.#appHeaderWrapperContainer);

      if (this.#contentProducts.length === 0) {
        render(this.#noItemsComponent, this.#catalogueListComponent.element);
      } else {

        for (let i = 0; i < Math.min(this.#contentProducts.length, PRODUCT_COUNT_PER_STEP); i++) {
          const product = this.#contentProducts[i];
          const productPresenter = new ProductPresenter({
            catalogueListComponent: this.#catalogueListComponent,
            appPopupContainer: this.#appPopupContainer,
            onModeChange: this.#handleModeChange
            //: (updatedProduct) => {
            //  this.#contentProducts = updateItem(this.#contentProducts, updatedProduct);
            //  this.#productPresenter.get(updatedProduct.id).init(updatedProduct);
            //}
          });
          productPresenter.init(product);
          this.#productPresenter.set(product.id, productPresenter);
        }
      }

      this.#renderCatalogueShowMoreBtnComponent({products: this.#contentProducts});

      this.#filterReasonComponent = new FilterReasonView({
        onFilterChange: (filter) => {
          if (filter === 'filter-reason-field-id-0') {
            const allFilterProducts = this.#contentProducts.slice();
            this.#renderProductsList({products: allFilterProducts});
            this.#renderCatalogueShowMoreBtnComponent({products: allFilterProducts});

          } else if (filter === 'filter-reason-field-id-1') {
            const birthdayboyFilterProducts = this.#contentProducts.slice().filter((product) => product.type === 'birthdayboy');
            this.#renderProductsList({products: birthdayboyFilterProducts});
            this.#renderCatalogueShowMoreBtnComponent({products: birthdayboyFilterProducts});

          } else if (filter === 'filter-reason-field-id-2') {
            const bridgeFilterProducts = this.#contentProducts.slice().filter((product) => product.type === 'bridge');
            this.#renderProductsList({products: bridgeFilterProducts});
            this.#renderCatalogueShowMoreBtnComponent({products: bridgeFilterProducts});

          } else if (filter === 'filter-reason-field-id-3') {
            const motherdayFilterProducts = this.#contentProducts.slice().filter((product) => product.type === 'motherday');
            this.#renderProductsList({products: motherdayFilterProducts});
            this.#renderCatalogueShowMoreBtnComponent({products: motherdayFilterProducts});

          } else if (filter === 'filter-reason-field-id-4') {
            const colleaguesFilterProducts = this.#contentProducts.slice().filter((product) => product.type === 'colleagues');
            this.#renderProductsList({products: colleaguesFilterProducts});
            this.#renderCatalogueShowMoreBtnComponent({products: colleaguesFilterProducts});

          } else if (filter === 'filter-reason-field-id-5') {
            const forloveFilterProducts = this.#contentProducts.slice().filter((product) => product.type === 'forlove');
            this.#renderProductsList({products: forloveFilterProducts});
            this.#renderCatalogueShowMoreBtnComponent({products: forloveFilterProducts});

          }
        }
      });
      render(this.#heroComponent, this.#appMainContainer);
      render(this.#missionComponent, this.#appMainContainer);
      render(this.#advantagesComponent, this.#appMainContainer);
      render(this.#filterReasonComponent, this.#appMainContainer);
      render(this.#filterColorComponent, this.#appMainContainer);
      render(this.#catalogueComponent, this.#appMainContainer);
      render(this.#containerComponent, this.#catalogueComponent.element);
      render(this.#catalogueHeaderComponent, this.#containerComponent.element);
      render(this.#catalogueListComponent, this.#containerComponent.element);
      render(this.#catalogueBtnWrapComponent, this.#containerComponent.element);

      //console.log(this.#contentProducts);
    }
  };

  #handleModeChange = () => {
    this.#productPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearProductList() {
    this.#productPresenter.forEach((presenter) => presenter.destroy());
    this.#productPresenter.clear();
    this.#renderedProductCount = PRODUCT_COUNT_PER_STEP;
    remove(this.#catalogueShowMoreBtnComponent);
  }

  #renderProductsList({products}) {
    this.#clearProductList();

    if (products.length === 0) {
      render(this.#noItemsComponent, this.#catalogueListComponent.element);
    } else {

      for (let i = 0; i < Math.min(products.length, PRODUCT_COUNT_PER_STEP); i++) {
        const product = products[i];
        const productPresenter = new ProductPresenter({
          catalogueListComponent: this.#catalogueListComponent,
          appPopupContainer: this.#appPopupContainer,
          onModeChange: this.#handleModeChange
        });
        productPresenter.init(product);
        this.#productPresenter.set(product.id, productPresenter);
      }
    }
  }

  #renderCatalogueShowMoreBtnComponent({products}){
    this.#catalogueShowMoreBtnComponent = new CatalogueShowMoreBtnView({
      onClick: () => {
        const currentProductsLength = products.slice(this.#renderedProductCount, this.#renderedProductCount + PRODUCT_COUNT_PER_STEP);
        for (let i = 0; i < Math.min(currentProductsLength.length, PRODUCT_COUNT_PER_STEP); i++) {
          const product = currentProductsLength[i];
          const productPresenter = new ProductPresenter({
            catalogueListComponent: this.#catalogueListComponent,
            appPopupContainer: this.#appPopupContainer,
            onModeChange: this.#handleModeChange
          });
          productPresenter.init(product);
          this.#productPresenter.set(product.id, productPresenter);
        }
        this.#renderedProductCount += PRODUCT_COUNT_PER_STEP;

        if (this.#renderedProductCount >= products.length) {
          remove(this.#catalogueShowMoreBtnComponent);
        }
      }
    });
    render(this.#catalogueShowMoreBtnComponent, this.#catalogueBtnWrapComponent.element);
  }
}
