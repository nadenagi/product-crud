import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

const router = [
  {
    path: '',
    component: ProductsComponent,
    data: {
      title: 'Products',
      permissions: {
        only: ['ADMIN', 'View Products'],
        redirectTo: '/pages/home',
      },
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProductsComponent],
  providers: [],
})
export class ProductsModule {}