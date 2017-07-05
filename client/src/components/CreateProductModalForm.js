import ProductModalFormAbstract from './ProductModalFormAbstract';


export default class CreateProductModalForm extends ProductModalFormAbstract {

  handleSubmit(product) {
    alert('ddd');
    super.handleSubmit(product);
  }
}
