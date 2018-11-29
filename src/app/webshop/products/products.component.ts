import { Component, OnInit } from '@angular/core';
import { WebshopService } from '../webshop.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [WebshopService]
})
export class ProductsComponent implements OnInit {

  allProducts: any;
  cart: any;
  constructor(public webshopService: WebshopService) {
  }

  ngOnInit() {
    this.webshopService.getAllProducts().subscribe(allProducts => {
      this.allProducts = allProducts;
    });
    this.webshopService.getCart().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(cart => {
      this.cart = cart[0];
    });

  }

  addProductstoCart(prod: any) {
    let self = this;
    // checing if Item is already added
    if (!this.checkAlreadyExists(prod.title)) {
      prod.quantity = 1;
      if (this.cart.products && this.cart.products.length > 0) {
        this.cart.products = this.cart.products.concat(prod);
      } else {
        this.cart['products'] = [prod];
      }
    } else {
      // Increase cart count
      for (let i = 0; i < self.cart.products.length; i++) {
        if (self.cart.products[i].title === prod.title) {
          self.cart.products[i].quantity ++;
          break;
        }
      }
    }

    this.updateCartDetails(this.cart);
    alert('Product added to cart');
  }

  checkAlreadyExists(title): boolean {
    let self = this;
    if (this.cart.products && this.cart.products.length > 0) {
      for (let i = 0; i < self.cart.products.length; i++) {
        const element = self.cart.products[i];
        if (element.title === title) {
          return true;
        }
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
}
