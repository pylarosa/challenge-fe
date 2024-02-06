import { Component } from '@angular/core';
import { OrderDTO, OrderFilterDTO } from '../dto/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../service/order.service';
import { AddressDetailsDialogComponent } from '../address-details-dialog/address-details-dialog.component';
import { Address } from '../dto/address';
import { UpdateOrderComponent } from '../update-order/update-order.component';
import { ViewProductsComponent } from '../view-products/view-products.component';

@Component({
  selector: 'app-filter-orders',
  templateUrl: './filter-orders.component.html',
  styleUrl: './filter-orders.component.css'
})
export class FilterOrdersComponent {
  orders: OrderDTO[] = [];
  orderFilter: OrderFilterDTO = new OrderFilterDTO;
  selectedOrderIndex: number | null = null;

  dateBy?: Date;
  dateTo?: Date;

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal) { }

  getAllOrders() {
    if (this.orderFilter.customer == "" || !this.orderFilter.customer) {
      this.orderFilter.customer = undefined;
    }
    this.orderService.filterOrders(this.orderFilter).subscribe((orders: OrderDTO[]) => {
      // Map status for each order
      orders.forEach(order => {
        order.status = this.orderService.mapOrderStatusFromServer(order.status.toLocaleString());
      });
      this.orders = orders;
    });
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

  getDefaultDate(): string {
    const currentDate = new Date();
    // Set the time to 00:00:00
    currentDate.setHours(0, 0, 0, 0);
    // Format the date to match the datetime-local input format (yyyy-MM-ddTHH:mm:ss)
    return currentDate.toISOString().slice(0, 16) + ":00"; // Append ":00" for seconds
  }
}
