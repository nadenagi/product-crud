import { Product } from './../../shared/types/Product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  @Input() popupType: string = 'update';
  @Input() seletcedProduct: Product = {
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
  @Output() closePopupEmitter = new EventEmitter();
  @Output() addEditProduct = new EventEmitter();
  @Output() deleteProductEmit = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  closePopup() {
    this.closePopupEmitter.emit();
  }

  deleteProduct() {
    this.deleteProductEmit.emit(this.seletcedProduct);
  }

  saveProduct() {
    this.addEditProduct.emit(this.seletcedProduct);
  }
}
