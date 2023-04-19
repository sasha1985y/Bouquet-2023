import { render, remove } from '../framework/render.js';
import { UpdateType, SortType, ReasonType, ColorType } from '../const.js';
import HeaderContainerView from '../view/header-container-view.js';
import PopupDefferedView from '../view/popup-deffered-view.js';
import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages-view.js';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import CatalogueView from '../view/catalogue-view.js';
import ContainerView from '../view/container-view.js';
import CatalogueSortingView from '../view/catalogue-sorting-view.js';
import CatalogueListView from '../view/catalogue-list-view.js';
import CatalogueBtnWrapView from '../view/catalogue-btn-wrap-view.js';
import CatalogueShowMoreBtnView from '../view/catalogue-show-more-btn-view.js';
import ProductPresenter from './product-presenter.js';
import NoItemsView from '../view/no-items-view.js';
import { sortPriceUp, sortPriceDown } from '../utils/product.js';
import { updateItem } from '../utils/common.js';

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
  /** @type {HTMLElement} компонент представления фильтра по причине подарка */
  #filterReasonComponent = null;
  /** @type {HTMLElement} компонент представления фильтра по цвету букета */
  #filterColorComponent = null;
  /** @type {HTMLElement} компонент представления, содержащий контейнер с представлениями каталога приложения */
  #catalogueComponent = new CatalogueView();
  /** @type {HTMLElement} компонент представления который используется в нескольких частях приложения в качестве формообразующего */
  #containerComponent = new ContainerView();
  /** @type {HTMLElement} компонент представления сортировки по цене и одновременно заголовок каталога */
  #catalogueSortingComponent = null;
  /** @type {HTMLElement} компонент представления пустого списка для рендера карточек букетов */
  #catalogueListComponent = new CatalogueListView();
  /** @type {HTMLElement} компонент представления кнопки возврата в начало каталога */
  #catalogueBtnWrapComponent = new CatalogueBtnWrapView();
  /** @type {HTMLElement} компонент представления сообщения при отсутствии данных с сервера */
  #noItemsComponent = new NoItemsView();
  /** @type {Array} копия данных с сервера */
  #contentProducts = [];
  /** @const {number} счётчик отрисованных карточек */
  #renderedProductCount = PRODUCT_COUNT_PER_STEP;
  /** @type {Map} свойство, где ContentPresenter будет хранить ссылки на все Product-презентеры */
  #productPresenter = new Map();
  /** @type {Array} копия данных с сервера для бэкапа после сортировки */
  #sourcedContentProducts = [];
  /** @type {string} режим сортировки по умолчанию */
  #currentSortType = SortType.DEFAULT;
  /**
   * @type {Object} объект с текущими настройками фильтрации
   * @param {string} reason кому букет
   * @param {string} colorAll все цвета?
   * @param {string} colorRed красный?
   * @param {string} colorWhite белый?
   * @param {string} colorViolet фиолетовый?
   * @param {string} colorYellow желтый?
   * @param {string} colorPink розовый?
   */
  #objectFilterSettings = {
    reason: ReasonType.ALL,
    colorAll: ColorType.COLORS,
    colorRed: ColorType.EMPTY,
    colorWhite: ColorType.EMPTY,
    colorViolet: ColorType.EMPTY,
    colorYellow: ColorType.EMPTY,
    colorPink: ColorType.EMPTY
  };


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
      this.#sourcedContentProducts = [...this.#productsModel.products];

      this.#renderHeaderHandlerComponent();

      this.#renderSorting({
        sortType: SortType.DEFAULT,
        products: this.#contentProducts,
        sourcedProducts: this.#sourcedContentProducts
      });

      this.#renderProductsList({products: this.#contentProducts});

      this.#renderCatalogueShowMoreBtnComponent({products: this.#contentProducts});

      render(this.#heroComponent, this.#appMainContainer);
      render(this.#missionComponent, this.#appMainContainer);
      render(this.#advantagesComponent, this.#appMainContainer);
      this.#renderFilterReasonComponent({products: this.#contentProducts});
      this.#renderFilterColorComponent();
      render(this.#catalogueComponent, this.#appMainContainer);
      render(this.#containerComponent, this.#catalogueComponent.element);
      render(this.#catalogueListComponent, this.#containerComponent.element);
      render(this.#catalogueBtnWrapComponent, this.#containerComponent.element);

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

  #renderHeaderHandlerComponent(){
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
  }

  #renderFilterReasonComponent({products}){
    this.#filterReasonComponent = new FilterReasonView({
      onFilterChange: (filter) => {
        if (filter === 'All') {
          const allFilterProducts = products.slice();
          this.#renderProductsList({products: allFilterProducts});
          this.#renderCatalogueShowMoreBtnComponent({products: allFilterProducts});
          this.#objectFilterSettings.reason = ReasonType.ALL;

        } else if (filter === 'birthdayboy') {
          const birthdayboyFilterProducts = products.slice().filter((product) => product.type === filter);
          this.#renderProductsList({products: birthdayboyFilterProducts});
          this.#renderCatalogueShowMoreBtnComponent({products: birthdayboyFilterProducts});
          this.#objectFilterSettings.reason = ReasonType.BIRHDAYBOY;

        } else if (filter === 'bridge') {
          const bridgeFilterProducts = products.slice().filter((product) => product.type === filter);
          this.#renderProductsList({products: bridgeFilterProducts});
          this.#renderCatalogueShowMoreBtnComponent({products: bridgeFilterProducts});
          this.#objectFilterSettings.reason = ReasonType.BRIDGE;

        } else if (filter === 'motherday') {
          const motherdayFilterProducts = products.slice().filter((product) => product.type === filter);
          this.#renderProductsList({products: motherdayFilterProducts});
          this.#renderCatalogueShowMoreBtnComponent({products: motherdayFilterProducts});
          this.#objectFilterSettings.reason = ReasonType.MOTHERDAY;

        } else if (filter === 'colleagues') {
          const colleaguesFilterProducts = products.slice().filter((product) => product.type === filter);
          this.#renderProductsList({products: colleaguesFilterProducts});
          this.#renderCatalogueShowMoreBtnComponent({products: colleaguesFilterProducts});
          this.#objectFilterSettings.reason = ReasonType.COLLEAGUES;

        } else if (filter === 'forlove') {
          const forloveFilterProducts = products.slice().filter((product) => product.type === filter);
          this.#renderProductsList({products: forloveFilterProducts});
          this.#renderCatalogueShowMoreBtnComponent({products: forloveFilterProducts});
          this.#objectFilterSettings.reason = ReasonType.FORLOVE;

        }
      }
    });
    render(this.#filterReasonComponent, this.#appMainContainer);
  }

  #renderFilterColorComponent(){
    this.#filterColorComponent = new FilterColorView({
      onColorFilterChange: (filter) => {
        if (filter === 'all') {
          this.#objectFilterSettings.colorAll = ColorType.COLORS;
          this.#objectFilterSettings.colorRed = ColorType.EMPTY;
          this.#objectFilterSettings.colorWhite = ColorType.EMPTY;
          this.#objectFilterSettings.colorViolet = ColorType.EMPTY;
          this.#objectFilterSettings.colorYellow = ColorType.EMPTY;
          this.#objectFilterSettings.colorPink = ColorType.EMPTY;

        } else if (filter === 'red') {
          this.#objectFilterSettings.colorRed = ColorType.RED;
          this.#objectFilterSettings.colorAll = ColorType.EMPTY;

        } else if (filter === 'white') {
          this.#objectFilterSettings.colorWhite = ColorType.WHITE;
          this.#objectFilterSettings.colorAll = ColorType.EMPTY;

        } else if (filter === 'violet') {
          this.#objectFilterSettings.colorViolet = ColorType.VIOLET;
          this.#objectFilterSettings.colorAll = ColorType.EMPTY;

        } else if (filter === 'yellow') {
          this.#objectFilterSettings.colorYellow = ColorType.YELLOW;
          this.#objectFilterSettings.colorAll = ColorType.EMPTY;

        } else if (filter === 'pink') {
          this.#objectFilterSettings.colorPink = ColorType.PINK;
          this.#objectFilterSettings.colorAll = ColorType.EMPTY;

        }
      }
    });
    render(this.#filterColorComponent, this.#appMainContainer);
  }

  #renderSorting({sortType, products, sourcedProducts}){
    this.#catalogueSortingComponent = new CatalogueSortingView({
      onSortTypeChange: this.#handleSortTypeChange(sortType, products, sourcedProducts)
    });
    render(this.#catalogueSortingComponent, this.#containerComponent.element);
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
          onModeChange: this.#handleModeChange,
          onDataChange: this.#handleProductChange
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

  #handleSortTypeChange = (sortType, products, sourcedProducts) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortProducts(sortType, products, sourcedProducts);
    this.#clearProductList();
    this.#renderProductsList(products);

  };

  #sortProducts({sortType, products, sourcedProducts}) {
    switch (sortType) {
      case SortType.PRICE_UP:
        products.sort(sortPriceUp);
        break;
      case SortType.PRICE_DOWN:
        products.sort(sortPriceDown);
        break;
      default:

        products = [...sourcedProducts];
    }

    this.#currentSortType = sortType;
  }

  #handleProductChange = (updatedProduct) => {
    this.#contentProducts = updateItem(this.#contentProducts, updatedProduct);
    this.#sourcedContentProducts = updateItem(this.#sourcedContentProducts, updatedProduct);
    this.#productPresenter.get(updatedProduct.id).init(updatedProduct);
  };
}
