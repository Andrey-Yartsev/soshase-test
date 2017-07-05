import React from 'react';
import {Control, Form, actions, Errors} from 'react-redux-form';
import createProduct from '../actions/product/create';
import connect from '../utils/reduxConnect';

import {
  Button, ModalBody, ModalFooter,
  FormGroup, Label, Input, FormText,
  Alert
} from 'reactstrap';

class ProductForm extends React.Component {

  handleSubmit(product) {
    createProduct(this.context.store.dispatch, Object.assign({}, product));
    this.props.toggle();
  }

  componentDidMount() {
    this.context.store.dispatch(
      actions.change('product.title', 'mobile')
    );
  }

  render() {
    return (
      <Form
        model="product"
        onSubmit={(product) => this.handleSubmit(product)}
      >
        <ModalBody>
          <FormGroup>
            <Control.text
              model="product.title"
              id="product.title"
              validators={{
                required: (val) => val && !!val.length
              }}
            />
            <Errors
              model="product.title"
              wrapper={(props) => <Alert color="danger">{props.children}</Alert>}
              messages={{
                required: 'Поле обязательно'
              }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button>
            Создать
          </Button>
        </ModalFooter>
      </Form>
    );
  }
}

export default connect(ProductForm);