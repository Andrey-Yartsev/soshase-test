import React from 'react';
import reduxConnect from '../utils/reduxConnect';
import {Container, Row, Col, Nav, Navbar, NavItem, NavLink, NavbarBrand, Table, Button} from 'reactstrap';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CreateProductModalForm from './CreateProductModalForm';

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalCreateProduct: true
    };
    this.toggleModalCreateProduct = this.toggleModalCreateProduct.bind(this);
  }
  toggleModalCreateProduct() {
    this.setState({
      modalCreateProduct: !this.state.modalCreateProduct
    });
  }

  createProduct() {
    this.refs.createProductForm.submit();
  }

  renderCreateProductModal() {
    return <Modal isOpen={this.state.modalCreateProduct} toggle={this.toggleModalCreateProduct} className={this.props.className}>
      <ModalHeader
        toggle={this.toggleModalCreateProduct}>Создание товара</ModalHeader>
      <CreateProductModalForm
        toggle={this.toggleModalCreateProduct}
      />
    </Modal>
  }

  render() {
    return (
      <Container>
        {this.renderCreateProductModal()}
        <Navbar color="faded" light toggleable>
          <NavbarBrand href="/">Soshase Test</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                onClick={this.toggleModalCreateProduct}
                href="#">Добавить товар</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/">Добавить категорию</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Row>
          <Col xs="3">
            <Nav vertical>
              <NavLink href="#">Первая</NavLink>
              <NavLink href="#">Вторая</NavLink>
              <NavLink href="#">Третья</NavLink>
            </Nav>
          </Col>
          <Col xs="8">
            <Table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Название товара</th>
                <th>Цена закп.</th>
                <th>Цена</th>
                <th>&nbsp;</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Button size="sm" color="danger">Удалить</Button>
                  <Button size="sm">Изменить</Button>
                </td>
              </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default reduxConnect(Layout);