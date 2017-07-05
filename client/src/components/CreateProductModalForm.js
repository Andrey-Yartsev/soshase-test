import ProductModalFormAbstract from './ProductModalFormAbstract';
import createProduct from '../actions/product/create';

export default class CreateProductModalForm extends ProductModalFormAbstract {

  handleSubmit(product) {
    createProduct(
      this.context.store.dispatch,
      Object.assign({}, product)
    );
    super.handleSubmit(product);
  }
}
