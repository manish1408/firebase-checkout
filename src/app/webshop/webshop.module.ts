import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebshopRoutingModule } from './webshop-routing.module';
import { ProductsComponent } from './products/products.component';
import { BasketComponent } from './basket/basket.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    WebshopRoutingModule
  ],
  declarations: [ProductsComponent, BasketComponent]
})
export class WebshopModule { }
