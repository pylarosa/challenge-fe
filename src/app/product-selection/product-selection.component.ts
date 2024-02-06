import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ProductDTO } from '../dto/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrl: './product-selection.component.css'
})

export class ProductSelectionComponent implements OnInit {
  [x: string]: any;
  products: ProductDTO[] = [];
  selectedQuantities: { [productId: string]: number } = {};
  selectedProducts: ProductDTO[] = [];
  quantityOptions: number[] = Array.from({ length: 11 }, (_, i) => i);
  totalPricePerProduct: { [productId: string]: number } = {};
  totalOrderPrice: number = 0;
  emptyProduct:  boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onQuantityChange(productId: string, quantity: number) {
    // Handle quantity changes
    this.selectedQuantities[productId] = quantity;
    this.selectedProducts = this.products.map(product => ({ ...product, quantity: this.selectedQuantities[product.productId] || 0 }));

    this.productService.getTotal();

    this.productService.selectedProducts = this.selectedProducts;
  }

  public getTotal() {
    this.totalOrderPrice = 0;
    this.selectedProducts.forEach(product => {
      this.totalOrderPrice += product.price * (product.quantity || 0);
    });
  }
}
