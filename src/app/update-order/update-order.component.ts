import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OrderDTO, OrderPatchDTO } from '../dto/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../service/order.service';
import { Coordinates } from '../dto/coordinate';
import { Address } from '../dto/address';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.css'
})

export class UpdateOrderComponent implements OnInit{
  @ViewChild('orderForm', { static: true }) orderForm: NgForm | undefined;
  @Input() originalOrder! : OrderDTO;
  patchOrder: OrderPatchDTO = new OrderPatchDTO;
  newAddress: Address = new Address;
  showCoord: boolean = false;
  changed: boolean = false;
  formSubmitted: boolean = false;
  
  constructor(
    private modalService: NgbModal, 
    private orderService: OrderService) {}

  ngOnInit(): void {
    this.patchOrder.orderId = this.originalOrder.orderId;
    this.patchOrder.address = this.originalOrder.address;
    }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.orderForm != undefined && !this.orderForm.invalid) {
      this.updateOrder();
    } else {
      alert("Ci sono errori di compilazione");
    }
  }

  updateOrder(): void {
    console.log("Updating the order with ID " + this.patchOrder.orderId);
    this.patchOrder.updated = true;
    this.orderService.updateOrder(this.patchOrder).subscribe(
      (response) => {
        console.log('Update successful:', response);
        this.orderService.emitOrderUpdated();

      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
    this.closeModal();

  }

  newCoordinates() {
    let newCoordinates: Coordinates = this.orderService.randomCoordinates();
    this.showCoord = true;
    this.newAddress = this.originalOrder.address;
    this.newAddress.coordinates = newCoordinates;
    this.patchOrder.address = this.newAddress;
    }
}
