import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/app/shared/types/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  baseItems: Product[] = [];
  filteredProducts: Product[] = [];
  openedProductEditor: boolean = false;
  showconfirmationPopup: boolean = false;
  showToaster: boolean = false;
  message: string = '';
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
  popupType: string = '';
  private readonly searchSubject = new Subject<string | undefined>();

  constructor(private store: StoreService) {}

  onSearchQueryInput(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    const trimmed = searchQuery?.trim();
    this.filteredProducts = this.baseItems.filter((item: any) => {
      return item.name.includes(trimmed);
    });
  }

  ngOnInit() {
    this.store.productList.subscribe((items: any) => {
      this.baseItems = items;
      this.filteredProducts = items;
      this.productList = items.length;
    });
  }

  selectItem(item: Product) {
    this.selectedProduct = item;
    this.showProductForm = true;
    this.openedProductEditor = false;
  }

  closeForm() {
    this.showconfirmationPopup = false;
    this.showProductForm = false;
    this.selectedProduct = this.defaultProduct;
  }

  updateProduct(product: Product, type: string) {
    this.selectedProduct = product;
    this.showconfirmationPopup = true;
    this.popupType = type;
  }

  saveProduct(product: Product) {
    if (product.id == 0) {
      product.id = ++this.productList;
      this.store.addProductToList(product);
      this.message = 'product added successfully';
      this.showToaster = true;
    } else {
      this.store.updateProduct(product);
      this.message = 'product updated successfully';
      this.showToaster = true;
    }

    this.showProductForm = false;
    this.showconfirmationPopup = false;
    this.selectedProduct = this.defaultProduct;
  }

  deleteProduct(product: Product) {
    this.store.deleteProduct(product);
    this.showProductForm = false;
    this.showconfirmationPopup = false;
    this.selectedProduct = this.defaultProduct;
    this.message = 'product deleted successfully';
    this.showToaster = true;
  }
}
