import React from 'react';
import reduxConnect from '../utils/reduxConnect';
import {Container, Row, Col, Nav, Navbar, NavItem, NavLink, NavbarBrand, Table, Button} from 'reactstrap';

import {Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {actions} from 'react-redux-form';

import ProductForm from './ProductForm';
import CategoryForm from './CategoryForm';

import fetchAll from '../actions/fetchAll';
import fetchProducts from '../actions/product/fetch';
import createProduct from '../actions/product/create';
import updateProduct from '../actions/product/update';
import createCategory from '../actions/category/create';
import deleteCategory from '../actions/category/delete';

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalProduct: false,
      modalCategory: false,
      modalCategoryDelete: false
    };
    this.toggleModalProduct = this.toggleModalProduct.bind(this);
    this.toggleModalCategory = this.toggleModalCategory.bind(this);
    this.clickPage = this.clickPage.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    fetchAll(this.context.store.dispatch);
  }

  toggleModalProduct() {
    this.setState({
      modalProduct: !this.state.modalProduct
    });
  }

  toggleModalCategory() {
    this.setState({
      modalCategory: !this.state.modalCategory
    });
  }

  createProduct(product) {
    console.log(product);
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

  renderProductModal() {
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

  renderCategoryModal() {
    let onSubmit = (data) => {
      createCategory(
        this.context.store.dispatch,
        data.title
      );
    };
    return <Modal isOpen={this.state.modalCategory} toggle={this.toggleModalCategory}
                  className={this.props.className}>
      <ModalHeader
        toggle={this.toggleModalCategory}>Создание категории</ModalHeader>
      <CategoryForm
        onSubmit={onSubmit}
        toggle={this.toggleModalCategory}
      />
    </Modal>
  }

  toggleModalCategoryDelete(id) {
    this.setState({
      modalCategoryDelete: id
    });
  }

  renderCategoryDeleteModal() {
    return <Modal
      isOpen={!!this.state.modalCategoryDelete}
      toggle={this.toggleModalCategoryDelete}
    >
      <ModalHeader
        toggle={() => {
          this.toggleModalCategoryDelete(false);
        }}>Удаление категории</ModalHeader>
      <ModalBody>
        Уверены?
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => {
          this.deleteCategory(this.state.modalCategoryDelete)
        }}>Да</Button>
        <Button onClick={() => {
          this.toggleModalCategoryDelete(false);
        }}>Нет</Button>
      </ModalFooter>
    </Modal>
  }

  clickPage(page, category) {
    fetchProducts(this.context.store.dispatch, page, category);
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
        let _product = Object.assign({}, product);
        delete _product._id;
        delete _product.__v;
        delete _product.id;
        this.context.store.dispatch(
          actions.change('product', _product)
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

  clickCreateCategory() {
    this.toggleModalCategory();
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

  deleteCategory(id) {
    deleteCategory(
      this.context.store.dispatch,
      id
    );
    this.toggleModalCategoryDelete(false);
  }

  renderCategories() {
    let items = [];
    if (this.props.categories.items && this.props.categories.items.length) {
      for (let item of this.props.categories.items) {
        items.push(<div key={item._id}>
          <Button size="sm" color="danger"
                  onClick={() => {
                    this.toggleModalCategoryDelete(item._id);
                  }}>X</Button>
          <NavLink
            href="#"
            onClick={
              () => {
                this.clickPage(1, item._id)
              }
            }
          >{item.title}</NavLink>
        </div>);
      }
    }
    items.push(<div key="">
      <NavLink href="#" onClick={() => {this.clickPage(1)}}>Без категории</NavLink>
    </div>);

    return items;
  }

  render() {
    return (
      <Container>
        {this.renderProductModal()}
        {this.renderCategoryModal()}
        {this.renderCategoryDeleteModal()}
        <Navbar color="faded" light toggleable>
          <NavbarBrand href="/">Soshase Test</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                onClick={this.clickCreateProduct.bind(this)}
                href="#">Добавить товар</NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={this.clickCreateCategory.bind(this)}
                href="#">Добавить категорию</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Row>
          <Col xs="3">
            <Nav vertical>
              {this.renderCategories()}
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