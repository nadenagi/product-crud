import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() selectedProduct: any;
  @Output() closeForm = new EventEmitter();
  @Output() addEditProduct = new EventEmitter();
  @Output() deleteProductEmit = new EventEmitter();
  productForm: FormGroup = new FormGroup({});
  showenPasswrd: boolean = false;
  submitted: boolean = false;
  productTypes: any[] = [
    {
      name: 'Type 1',
      value: 1,
    },
    {
      name: 'Type 2',
      value: 2,
    },
  ];

  constructor() {
    this.setForm();
  }

  setForm() {
    this.productForm = new FormGroup({
      id: new FormControl(this.selectedProduct?.id),
      name: new FormControl(this.selectedProduct?.name, Validators.required),
      productType: new FormControl(
        this.selectedProduct?.productType,
        Validators.required
      ),
      productCategory: new FormControl(
        this.selectedProduct?.productCategory,
        Validators.required
      ),
      subCategory: new FormControl(this.selectedProduct?.subCategory),
      referenceId: new FormControl(this.selectedProduct?.referenceId),
      password: new FormControl(
        this.selectedProduct?.password,
        Validators.required
      ),
      deleveryFeesAmount: new FormControl(
        this.selectedProduct?.deleveryFeesAmount
      ),
      deleveryFeesPercentage: new FormControl(
        this.selectedProduct?.deleveryFeesPercentage
      ),
    });
  }

  ngOnChanges(): void {
    this.setForm();
    this.submitted = false;
  }

  ngOnInit(): void {
    this.submitted = false;
  }

  saveProduct() {
    if (this.productForm.valid) {
      this.addEditProduct.emit(this.productForm.value);
    } else {
      this.submitted = true;
    }
  }

  deleteProduct() {
    this.deleteProductEmit.emit(this.productForm.value);
    this.submitted = false;
  }

  cancelEdit() {
    this.closeForm.emit();
    this.submitted = false;
  }

  chanegePasswordType() {
    let x = document.getElementById('inputPassword') as HTMLInputElement;
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }
}
