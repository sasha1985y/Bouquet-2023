import UpdateType from '../const.js'

export default class ContentPresenter {
  #productsModel = null;

  #contentProducts = [];
  
  constructor({productsModel}) {
    this.#productsModel = productsModel;
    this.#productsModel.addObserver(this.#handleModelEvent);
  }
  
  //get products() {
  //  const products = this.#productsModel.products;
  //  
  //}
  
  init = () => {
    //this.#renderBoard();
  }
  
  #handleModelEvent = (updateType) => {
     
    if(updateType === UpdateType.INIT) {
      this.#contentProducts = [...this.#productsModel.products];
      console.log(this.#contentProducts);
    }
  };

  //#renderBoard() {
  //  const products = this.products;
  //}
}