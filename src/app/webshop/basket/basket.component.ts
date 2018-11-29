import { Component, OnInit } from '@angular/core';
import { WebshopService } from '../webshop.service';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [WebshopService]
})
export class BasketComponent implements OnInit {

  cart: any;
  cartId: any;
  newProducts: any;
  allProducts: any;
  constructor(public webshopService: WebshopService) {
    this.newProducts = [{
      "description": "",
      "id": null,
      "price": null,
      "quantity": 1,
      "title": ""
    }];
    this.allProducts = [];
  }


  ngOnInit() {
    let self = this;
    this.webshopService.getCart().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(cart => {
      this.cart = cart;
      this.getProductsList();
    });
  }

  getProductsList() {
    let self = this;
    self.allProducts = [];
    self.webshopService.getAllProducts().subscribe(allProducts => {
      allProducts.forEach(product => {
       if (!self.checkAlreadyExists(product.title)) {
         self.allProducts.push(product);
       }
      });
    });
  }

  checkAlreadyExists(title): boolean {
    let self = this;
    for (let i = 0; i <  self.cart[0].products.length; i++) {
      const element =  self.cart[0].products[i];
      if (element.title === title) {
        return true;
       }
    }
    return false;
  }

  updateCartDetails(item) {
    item.totalAmount = 0;
    item.totalQuantity = 0;
    item.products.forEach(product => {
      item.totalAmount += (product.quantity * product.price);
      item.totalQuantity += product.quantity;
    });
    this.webshopService.updateCart(item.key, item);
  }

  addProductstoCart(cart) {
    cart.products = cart.products.concat(this.newProducts);
    this.newProducts = [{
      "description": "",
      "id": null,
      "price": null,
      "quantity": 1,
      "title": ""
    }];
    this.getProductsList();
    this.updateCartDetails(cart);
  }

  deleteFromCart(index, cart) {
    cart.products.splice(index, 1);
    this.getProductsList();
    this.updateCartDetails(cart);
  }

  getProductPrice(item) {
    this.allProducts.forEach(element => {
      if (item.title === element.title) {
        item.price = element.price;
      }
    });
  }

  addAnother() {
    this.newProducts.push({
      "description": "",
      "id": null,
      "price": null,
      "quantity": 1,
      "title": ""
    });
  }

  removeProduct(index) {
    this.newProducts.splice(index, 1);
  }

}
