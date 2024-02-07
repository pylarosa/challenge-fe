import { Component, Input, OnInit } from '@angular/core';
import { ProductDTO } from '../dto/product';
import { ProductService } from '../service/product.service';
import { OrderDTO } from '../dto/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})

export class ViewProductsComponent implements OnInit {
  @Input() originalOrder!: OrderDTO;
  products: ProductDTO[] = [];

  constructor(
    private modalService: NgbModal,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    const orderId = this.originalOrder.orderId;
    this.productService.getProductByOrder(orderId).subscribe(
      (response) => {
        this.products = response;
        console.log('Update successful:', response);
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
