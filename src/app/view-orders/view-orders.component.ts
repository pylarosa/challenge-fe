import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderDTO, OrderFilterDTO, Status } from '../dto/order';
import { OrderService } from '../service/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressDetailsDialogComponent } from '../address-details-dialog/address-details-dialog.component';
import { Address } from '../dto/address';
import { UpdateOrderComponent } from '../update-order/update-order.component';
import { ViewProductsComponent } from '../view-products/view-products.component';
import { Subscription } from 'rxjs';
import { Point } from '../dto/coordinate';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})

export class ViewOrdersComponent implements OnInit {
  @Input() isSendOrder: boolean = false;
  @Output() coordinateList = new EventEmitter<{ coordinates: Point[], orders: OrderDTO[] }>();
  @Input() orders: OrderDTO[] = [];

  orderFilter: OrderFilterDTO = new OrderFilterDTO;
  selectedCoordinates: Point[] = [];
  selectedOrders: OrderDTO[] = [];
  status!: Status;

  noOrder: boolean = true;


  private orderUpdatedSubscription?: Subscription;

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllOrders();

    this.orderUpdatedSubscription = this.orderService.orderUpdated$.subscribe(() => {
      this.getAllOrders();
    });
  }

  public getAllOrders() {
    this.orderService.filterOrders(this.orderFilter).subscribe((orders: OrderDTO[]) => {
      // Map status for each order
      orders.forEach(order => {
        order.status = this.orderService.mapOrderStatusFromServer(order.status!.toLocaleString());
      });
      this.orders = orders;
      if (this.orders.length > 0) {
        this.noOrder = false;
      }
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


  toggleCheckbox(order: OrderDTO) {
    const id = order.orderId
    const x = order.address.coordinates.latitude
    const y = order.address.coordinates.longitude
    const pointToFind = new Point(id, x, y)
    const index = this.selectedCoordinates.findIndex(point => point.id === pointToFind.id)
    if (index === -1) {
      this.selectedCoordinates.push(pointToFind);
      this.selectedOrders.push(order);
    } else {
      this.selectedCoordinates.splice(index, 1);
      this.selectedOrders.splice(index, 1)
    }

    const data: CoordinateEventData = {
      coordinates: this.selectedCoordinates,
      orders: this.selectedOrders
    };

    // Emit the updated selected and deselected coordinates
    return this.coordinateList.emit(data);

  }

  ngOnDestroy(): void {
    this.orderUpdatedSubscription?.unsubscribe();
  }
}

type CoordinateEventData = {
  coordinates: Point[];
  orders: OrderDTO[];
};