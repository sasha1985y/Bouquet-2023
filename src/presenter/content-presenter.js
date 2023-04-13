import { render, remove, RenderPosition } from '../framework/render.js';
import UpdateType from '../const.js';
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

export default class ContentPresenter {
  #productsModel = null;
  #appMainContainer = null;
  #appPopupContainer = null;

  #productComponent = null;
  #ProductPopupComponent = null;

  #heroView = new HeroView();
  #missionView = new MissionView();
  #advantagesView = new AdvantagesView();
  #filterReasonView = new FilterReasonView();
  #filterColorView = new FilterColorView();
  #catalogueView = new CatalogueView();
  #containerView = new ContainerView();
  #catalogueHeaderView = new CatalogueHeaderView();
  #catalogueListView = new CatalogueListView();
  #catalogueBtnWrapView = new CatalogueBtnWrapView();
  #catalogueShowMoreBtnView = new CatalogueShowMoreBtnView();

  #contentProducts = [];

  constructor({
    productsModel,
    appMainContainer,
    appPopupContainer
  }) {
    this.#productsModel = productsModel;
    this.#productsModel.addObserver(this.#handleModelEvent);
    this.#appMainContainer = appMainContainer;
    this.#appPopupContainer = appPopupContainer;
  }

  #renderProduct({product}) {
    const productPresenter = new ProductPresenter({
      catalogueListView: this.#catalogueListView,
      appPopupContainer: this.#appPopupContainer
    });
    productPresenter.init(product);
  }

  init = () => {
    //this.#renderBoard();
  };

  #handleModelEvent = (updateType) => {
    if(updateType === UpdateType.INIT) {
      this.#contentProducts = [...this.#productsModel.products];

      this.#renderBoard({products: this.#contentProducts});

      for (let i = 0; i < this.#contentProducts.length; i++) {
        this.#renderProduct({product: this.#contentProducts[i]});
      }
    }
  };

  #renderBoard({products}) {
    render(this.#heroView, this.#appMainContainer);
    render(this.#missionView, this.#appMainContainer);
    render(this.#advantagesView, this.#appMainContainer);
    render(this.#filterReasonView, this.#appMainContainer);
    render(this.#filterColorView, this.#appMainContainer);
    render(this.#catalogueView, this.#appMainContainer);
    render(this.#containerView, this.#catalogueView.element);
    render(this.#catalogueHeaderView, this.#containerView.element);
    render(this.#catalogueListView, this.#containerView.element);
    render(this.#catalogueBtnWrapView, this.#containerView.element);
    render(this.#catalogueShowMoreBtnView, this.#catalogueBtnWrapView.element);
    console.log(products);
  }
}
