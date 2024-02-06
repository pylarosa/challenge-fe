import { Component, ViewChild } from '@angular/core';
import { OrderDTO, Status } from '../dto/order';
import { OrderService } from '../service/order.service';
import { ProductService } from '../service/product.service';
import { ValidatorFn, AbstractControl, NgForm } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-order',
  templateUrl: './insert-order.component.html',
  styleUrl: './insert-order.component.css'
})
export class InsertOrderComponent {
  @ViewChild('orderForm', { static: true }) orderForm: NgForm | undefined;
  order: OrderDTO = new OrderDTO();
  orderId: string = "";
  formSubmitted: boolean = false;
  
  constructor
    (private orderService: OrderService,
      private productService: ProductService,
      private router: Router) { }

  submitForm() {
    this.formSubmitted = true;
    if (this.orderForm != undefined && !this.orderForm.invalid) {
      this.sendOrder();
    } else {
      alert("Ci sono errori di compilazione");
    }
  }

  sendOrder() {
    this.order.address.coordinates = this.orderService.randomCoordinates();
    this.order.status = Status.PRESO_IN_CARICO;
    this.order.orderDate = new Date()
    this.order.updateDate = "";
    this.order.updated = false;
    this.order.productsDto = this.productService.selectedProducts;
    this.order.total = this.productService.getTotal();

    if (this.order.total != 0) {
      this.orderService.insertOrder(this.order).subscribe(
        (order: OrderDTO) => {
          this.orderId = order.orderId;
          console.log(this.orderId);
          alert("Ordine effettuato con successo: codice Ordine: " + this.orderId);
          this.router.navigate(['/orders']);
        },
        (error) => {
          // Handle errors if needed
          console.error('Error:', error);
        }
      )
    } else {
      alert("Devi selezionare almeno un prodotto");
    }
  }
}