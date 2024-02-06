import { Component, OnInit } from '@angular/core';
import { OrderDTO, OrderFilterDTO } from '../dto/order';
import { OrderService } from '../service/order.service';
import { ProductDTO } from '../dto/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressDetailsDialogComponent } from '../address-details-dialog/address-details-dialog.component';
import { Address } from '../dto/address';
import { UpdateOrderComponent } from '../update-order/update-order.component';
import { ViewProductsComponent } from '../view-products/view-products.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})

export class ViewOrdersComponent implements OnInit {
  orders: OrderDTO[] = [];
  orderFilter: OrderFilterDTO = new OrderFilterDTO;
  selectedOrderIndex: number | null = null;

  dateBy?: Date;
  dateTo?: Date;

  noOrder: boolean = true;

  private orderUpdatedSubscription?: Subscription;
  
  constructor(
    private orderService: OrderService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllOrders();

    this.orderUpdatedSubscription = this.orderService.orderUpdated$.subscribe(() => {
      this.getAllOrders();
    });
  }

  private getAllOrders() {
    this.orderService.filterOrders(this.orderFilter).subscribe((orders: OrderDTO[]) => {
      // Map status for each order
      orders.forEach(order => {
        order.status = this.orderService.mapOrderStatusFromServer(order.status.toLocaleString());
      });
      this.orders = orders;
      if (this.orders.length > 0) {
        this.noOrder = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.orderUpdatedSubscription?.unsubscribe();
  }

  openAddressDetailsModal(address: Address): void {
    console.log(address);
    const modalRef = this.modalService.open(AddressDetailsDialogComponent, { centered: true });
    modalRef.componentInstance.address = address;
  }

  uopenUpdateOrderDialog(order: OrderDTO): void {
    const modalRef = this.modalService.open(UpdateOrderComponent, { centered: true });
    modalRef.componentInstance.originalOrder = order;
  }

  openProductList(order: OrderDTO): void {
    const modalRef = this.modalService.open(ViewProductsComponent, { centered: true });
    modalRef.componentInstance.originalOrder = order;
  }
}