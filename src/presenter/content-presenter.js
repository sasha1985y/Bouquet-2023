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

const PRODUCT_COUNT_PER_STEP = 3;

export default class ContentPresenter {
  #productsModel = null;
  #appMainContainer = null;
  #appContentContainer = null;
  #appPopupContainer = null;
  #appHeaderWrapperContainer = null;

  #headerHandlerComponent = null;
  #popupDefferedComponent = null;
  #appPopupDefferedContainer = null;

  #catalogueShowMoreBtnComponent = null;

  #heroComponent = new HeroView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();
  #filterReasonComponent = new FilterReasonView();
  #filterColorComponent = new FilterColorView();
  #catalogueComponent = new CatalogueView();
  #containerComponent = new ContainerView();
  #catalogueHeaderComponent = new CatalogueHeaderView();
  #catalogueListComponent = new CatalogueListView();
  #catalogueBtnWrapComponent = new CatalogueBtnWrapView();
  #noItemsComponent = new NoItemsView();

  #contentProducts = [];
  #renderedProductCount = PRODUCT_COUNT_PER_STEP;

  constructor({
    productsModel,
    appMainContainer,
    appContentContainer,
    appPopupContainer,
    appHeaderWrapperContainer,
    appPopupDefferedContainer
  }) {
    this.#productsModel = productsModel;
    this.#productsModel.addObserver(this.#handleModelEvent);
    this.#appMainContainer = appMainContainer;
    this.#appContentContainer = appContentContainer;
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
          this.#renderProduct({product: this.#contentProducts[i]});
        }
      }

      this.#renderBoard();

      this.#catalogueShowMoreBtnComponent = new CatalogueShowMoreBtnView({
        onClick: () => {
          const currentProductsLength = this.#contentProducts.slice(this.#renderedProductCount, this.#renderedProductCount + PRODUCT_COUNT_PER_STEP);
          for (let i = 0; i < Math.min(currentProductsLength.length, PRODUCT_COUNT_PER_STEP); i++) {
            this.#renderProduct({product: currentProductsLength[i]});
          }
          this.#renderedProductCount += PRODUCT_COUNT_PER_STEP;

          if (this.#renderedProductCount >= this.#contentProducts.length) {
            remove(this.#catalogueShowMoreBtnComponent);
          }
        }
      });
      render(this.#catalogueShowMoreBtnComponent, this.#catalogueBtnWrapComponent.element);

      //console.log(this.#contentProducts);
    }
  };

  #renderProduct({product}) {
    const productPresenter = new ProductPresenter({
      catalogueListComponent: this.#catalogueListComponent,
      appPopupContainer: this.#appPopupContainer
    });
    productPresenter.init(product);
  }

  #renderBoard() {
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
  }
}
