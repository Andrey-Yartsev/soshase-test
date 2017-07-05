import React from 'react';
import {Control, Form, actions, Errors} from 'react-redux-form';
import connect from '../utils/reduxConnect';

import {
  Button, ModalBody, ModalFooter,
  FormGroup, Label, Input, FormText,
  Alert
} from 'reactstrap';

class ProductForm extends React.Component {

  handleSubmit(product) {
    this.props.onSubmit(product);
    this.props.toggle();
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
              model=".title"
              validators={{
                required: (val) => val && !!val.length
              }}
            />
            <Errors
              model="product.title"
              messages={{
                required: 'Поле обязательно'
              }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button>
            Сохранить
          </Button>
        </ModalFooter>
      </Form>
    );
  }
}

export default connect(ProductForm);