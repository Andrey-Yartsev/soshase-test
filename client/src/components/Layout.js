import React from 'react';
import reduxConnect from '../utils/reduxConnect';
import {Container, Row, Col, Nav, Navbar, NavItem, NavLink, NavbarBrand, Table, Button} from 'reactstrap';

import {Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {actions} from 'react-redux-form';

import ProductForm from './ProductForm';

import fetchProducts from '../actions/product/fetch';
import createProduct from '../actions/product/create';
import updateProduct from '../actions/product/update';

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalProduct: false
    };
    this.toggleModalProduct = this.toggleModalProduct.bind(this);
    this.clickPage = this.clickPage.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    fetchProducts(this.context.store.dispatch);
  }

  toggleModalProduct() {
    this.setState({
      modalProduct: !this.state.modalProduct
    });
  }

  createProduct(product) {
    createProduct(
      this.context.store.dispatch,
      Object.assign({}, product)
    );
  }

  updateProduct(product) {
    updateProduct(
      this.context.store.dispatch,
      this.state.editProduct,
      Object.assign({}, product)
    );
  }

  renderCreateProductModal() {
    let title, onSubmit;
    if (this.state.editProduct) {
      title = 'Редактирование товара';
      onSubmit = this.updateProduct;
    } else {
      title = 'Создание товара';
      onSubmit = this.createProduct;
    }
    return <Modal isOpen={this.state.modalProduct} toggle={this.toggleModalProduct}
                  className={this.props.className}>
      <ModalHeader
        toggle={this.toggleModalProduct}>{title}</ModalHeader>
      <ProductForm
        onSubmit={onSubmit}
        toggle={this.toggleModalProduct}
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
              onClick={() => {
                this.clickPage(page)
              }}
            >{page}</PaginationLink>
          </PaginationItem>
        );
      }
    }
    return <Pagination>
      {items}
    </Pagination>
  }

  clickProductEdit(id) {
    this.setState({
      editProduct: id
    });
    for (let product of this.props.products.data.docs) {
      if (product.id === id) {
        this.context.store.dispatch(
          actions.change('product.title', product.title)
        );
        this.toggleModalProduct();
        break;
      }
    }
  }

  clickCreateProduct() {
    this.setState({
      editProduct: false
    });
    this.toggleModalProduct();
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
              <Button size="sm" onClick={() => {
                this.clickProductEdit(item.id)
              }}>Изменить</Button>
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
                onClick={this.clickCreateProduct.bind(this)}
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