import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ProductDTO } from '../dto/product';

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
  emptyProduct: boolean = false;
  totalOrderPrice!: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.totalOrderPrice = 0;

    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onQuantityChange(productId: string, quantity: number) {
    this.selectedQuantities[productId] = quantity;
    this.selectedProducts = this.products.map(product => ({ ...product, quantity: this.selectedQuantities[product.productId] || 0 }));

    // Calculate total price per product
    this.totalPricePerProduct = {};
    this.selectedProducts.forEach(product => {
      this.totalPricePerProduct[product.productId] = product.quantity * product.price;
    });

    this.totalOrderPrice = 0;
    this.selectedProducts.forEach(product => {
      this.totalOrderPrice += product.price * (product.quantity || 0);
    });
    this.totalOrderPrice = +this.totalOrderPrice.toFixed(3);
    this.productService.selectedProducts = this.selectedProducts;
  }
}
