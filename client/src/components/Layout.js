import React from 'react';
import reduxConnect from '../utils/reduxConnect';
import {Container, Row, Col, Nav, Navbar, NavItem, NavLink, NavbarBrand, Table, Button} from 'reactstrap';

import {Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import CreateProductModalForm from './CreateProductModalForm';

import fetchProducts from '../actions/product/fetch';

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalCreateProduct: false
    };
    this.toggleModalCreateProduct = this.toggleModalCreateProduct.bind(this);
    this.clickPage = this.clickPage.bind(this)
  }

  componentDidMount() {
    fetchProducts(this.context.store.dispatch);
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
    return <Modal isOpen={this.state.modalCreateProduct} toggle={this.toggleModalCreateProduct}
                  className={this.props.className}>
      <ModalHeader
        toggle={this.toggleModalCreateProduct}>Создание товара</ModalHeader>
      <CreateProductModalForm
        toggle={this.toggleModalCreateProduct}
      />
    </Modal>
  }

  clickPage(page) {
    fetchProducts(this.context.store.dispatch, page);
  }

  renderPagination() {
    let items = [];
    if (this.props.products.data && this.props.products.data.pages) {
      for (let page = 1; page <= this.props.products.data.pages; page++) {
        items.push(
          <PaginationItem key={page}>
            <PaginationLink
            onClick={() => {this.clickPage(page)}}
            >{page}</PaginationLink>
          </PaginationItem>
        );
      }
    }
    return <Pagination>
      {items}
    </Pagination>
  }

  renderProductRows() {
    let rows = [];
    if (this.props.products.data && this.props.products.data.docs.length) {
      for (let item of this.props.products.data.docs) {
        rows.push(
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.title}</td>
            <td>{item.buyPrice}</td>
            <td>{item.price}</td>
            <td>
              <Button size="sm" color="danger">Удалить</Button>
              <Button size="sm">Изменить</Button>
            </td>
          </tr>
        );
      }
    }
    return rows;
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
            {this.renderPagination()}
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
                {this.renderProductRows()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default reduxConnect(Layout);