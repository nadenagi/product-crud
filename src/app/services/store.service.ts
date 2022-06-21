import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../shared/types/Product';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  productList: any = new BehaviorSubject<Product[]>([
    {
      id: 1,
      name: 'product 1',
      productType: 1,
      productCategory: 'category 1',
      subCategory: false,
      referenceId: 1,
      password: '',
      deleveryFeesAmount: 100,
      deleveryFeesPercentage: 1.5,
    },
  ]);
  selectedProduct: any = new BehaviorSubject({});

  constructor() {}

  updateSelectedProduct(product: Product) {
    this.selectedProduct.next(product);
  }

  addProductToList(product: Product) {
    let res = this.productList.getValue();
    res.push(product);
    this.productList.next(res);
  }

  updateProduct(product: Product) {
    let res = this.productList.getValue();
    let index = res.findIndex((item: any) => item.id == product.id);
    if (index != -1) {
      res[index] = product;
      this.productList.next(res);
    }
  }

  deleteProduct(product: Product) {
    let res = this.productList.getValue();
    let index = res.findIndex((item: any) => item.id == product.id);
    if (index != -1) {
      res.splice(index, 1);
      this.productList.next(res);
    }
  }
}
