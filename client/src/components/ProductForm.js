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

  renderCategoryField() {
    const name = 'category';
    let options = [];
    options.push(<option value="" key="">Выберите категорию</option>);
    if (this.props.categories.items) {
      for (let item of this.props.categories.items) {
        options.push(<option value={item._id} key={item._id}>{item.title}</option>);
      }
    }
    return <FormGroup>
      <Control.select
        model={'.' + name}
        validators={{
          required: (val) => val && !!val.length
        }}
      >
        {options}
      </Control.select>
      <Errors
        model={'product.' + name}
        messages={{
          required: 'Поле обязательно'
        }}
      />
    </FormGroup>;
  }

  renderField(name) {
    return <FormGroup>
      <Control.text
        model={'.' + name}
        validators={{
          required: (val) => val && !!val.length
        }}
      />
      <Errors
        model={'product.' + name}
        messages={{
          required: 'Поле обязательно'
        }}
      />
    </FormGroup>;
  }

  render() {
    return (
      <Form
        model="product"
        onSubmit={(product) => this.handleSubmit(product)}
      >
        <ModalBody>
          {this.renderCategoryField()}
          {this.renderField('title')}
          {this.renderField('buyPrice')}
          {this.renderField('price')}
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