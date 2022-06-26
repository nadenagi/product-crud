import {
    Component,
    Input,
    OnChanges,
    OnInit,
    Output,
    EventEmitter,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnChanges {
    @Input() selectedProduct: any
    @Output() closeForm = new EventEmitter()
    @Output() addEditProduct = new EventEmitter()
    @Output() deleteProductEmit = new EventEmitter()
    productForm: FormGroup = new FormGroup({})
    showenPasswrd: boolean = false
    submitted: boolean = false
    productTypes: any[] = [
        {
            name: 'Type 1',
            value: 1,
        },
        {
            name: 'Type 2',
            value: 2,
        },
    ]

    constructor() {
        this.setForm()
    }

    setForm() {
        this.productForm = new FormGroup({
            id: new FormControl(this.selectedProduct?.id),
            name: new FormControl(this.selectedProduct?.name, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(20),
                Validators.pattern('^[a-z A-Z 0-9 ]{5,}$'),
            ]),
            productType: new FormControl(this.selectedProduct?.productType, [
                Validators.required,
            ]),
            productCategory: new FormControl(
                this.selectedProduct?.productCategory,
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(20),
                    Validators.pattern('^[a-z A-Z 0-9 ]{5,}$'),
                ]
            ),
            subCategory: new FormControl(this.selectedProduct?.subCategory),
            referenceId: new FormControl(this.selectedProduct?.referenceId),
            password: new FormControl(this.selectedProduct?.password, [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(15),
            ]),
            deleveryFeesAmount: new FormControl(
                this.selectedProduct?.deleveryFeesAmount
            ),
            deleveryFeesPercentage: new FormControl(
                this.selectedProduct?.deleveryFeesPercentage
            ),
        })
    }

    ngOnChanges(): void {
        this.setForm()
        this.submitted = false
    }

    ngOnInit(): void {
        this.submitted = false
    }

    saveProduct() {
        this.productForm.valid
            ? this.addEditProduct.emit(this.productForm.value)
            : (this.submitted = true)
    }

    deleteProduct() {
        this.deleteProductEmit.emit(this.productForm.value)
        this.submitted = false
    }

    cancelEdit() {
        this.closeForm.emit()
        this.submitted = false
    }

    chanegePasswordType() {
        let x = document.getElementById('inputPassword') as HTMLInputElement
        x.type = x.type === 'password' ? 'text' : 'password'
    }
}
