import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/app/shared/types/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  filteredProducts: Product[] = [];
  openedProductEditor: boolean = false;
  defaultProduct: Product = {
    id: 0,
    name: '',
    productType: 0,
    productCategory: '',
    subCategory: false,
    referenceId: 0,
    password: '',
    deleveryFeesAmount: 0,
    deleveryFeesPercentage: 0,
  };

  selectedProduct: Product = {
    id: 0,
    name: '',
    productType: 0,
    productCategory: '',
    subCategory: false,
    referenceId: 0,
    password: '',
    deleveryFeesAmount: 0,
    deleveryFeesPercentage: 0,
  };
  showProductForm: boolean = false;
  productList: any;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.store.productList.subscribe((items: any) => {
      this.filteredProducts = items;
      this.productList = items.length;
    });
  }

  closeForm() {
    this.showProductForm = false;
    this.selectedProduct = this.defaultProduct;
  }

  saveProduct(product: Product) {
    if (product.id == 0) {
      product.id = ++this.productList;
      this.store.addProductToList(product);
    } else {
      this.store.updateProduct(product);
    }
    this.showProductForm = false;
    this.selectedProduct = this.defaultProduct;
  }

  deleteProduct(product: Product) {
    this.store.deleteProduct(product);
  }
}
