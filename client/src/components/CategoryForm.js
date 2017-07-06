import React from 'react';
import {Control, Form, actions, Errors} from 'react-redux-form';
import connect from '../utils/reduxConnect';

import {
  Button, ModalBody, ModalFooter,
  FormGroup, Label, Input, FormText,
  Alert
} from 'reactstrap';

class CategoryForm extends React.Component {

  handleSubmit(category) {
    this.props.onSubmit(category);
    this.props.toggle();
  }

  render() {
    return (
      <Form
        model="category"
        onSubmit={(category) => this.handleSubmit(category)}
      >
        <ModalBody>
          <FormGroup>
            <Control.text
              model=".title"
              placeholder="Название"
              validators={{
                required: (val) => val && !!val.length
              }}
            />
            <Errors
              model="category.title"
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

export default connect(CategoryForm);