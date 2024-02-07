import { Component, Input, OnInit } from '@angular/core';
import { CalculatePathService } from '../service/calculate-path.service';
import { Point } from '../dto/coordinate';
import { OrderDTO, OrderPatchDTO, Status } from '../dto/order';
import { OrderService } from '../service/order.service';
import { DepotDTO } from '../dto/depot';

@Component({
  selector: 'app-send-order',
  templateUrl: './send-order.component.html',
  styleUrl: './send-order.component.css'
})
export class SendOrderComponent implements OnInit {
  @Input() orders: OrderDTO[] = [];
  constructor(
    private calculatePathService: CalculatePathService,
    private orderService: OrderService
  ) { }

  ordersToSend: OrderDTO[] = [];
  coordinateList!: Point[];
  depot!: DepotDTO;
  depotCoordinates: Point = new Point;
  orderToPatch: OrderPatchDTO = new OrderPatchDTO;
  orderedPoints: Point[] = [];
  noCheckBoxSelected: boolean = true;
  pathCalculated: boolean = false;


  calculatePath() {
    let points: Point[] = this.calculatePathService.findOptimalRoute(this.depotCoordinates, this.coordinateList ? this.coordinateList : undefined)
    this.orderedPoints = points;
    this.updateOrderStatus();
    this.pathCalculated = true;
  }

  updateOrderStatus() {
    if (this.ordersToSend.length !== 0) {
      for (const order of this.ordersToSend) {
        this.orderToPatch.orderId = order.orderId;
        this.orderToPatch.address = order.address;
        this.orderToPatch.updated = true;
        this.ordersToSend.forEach(order => {
          order.status = this.orderService.mapOrderStatusFromServer(Status.IN_CONSEGNA.toLocaleString());
          this.orderToPatch.status = order.status;
        });
        this.orderService.updateOrder(this.orderToPatch).subscribe(
          (response) => {
            console.log('Update successful:', response);
            this.orderService.emitOrderUpdated();
          },
          (error) => {
            console.error('Update failed:', error);
          }
        );
      }
    }
  }

  ngOnInit(): void {
    this.getDepot();
    this.orderedPoints = [];
    this.pathCalculated = false;
  }

  public getDepot() {
    this.calculatePathService.getDepot().subscribe(
      (depotDTO: DepotDTO) => {
        this.depot = depotDTO;
        this.depotCoordinates.id = this.depot!.depotId!;
        this.depotCoordinates.latitude = this.depot!.address!.coordinates.latitude;
        this.depotCoordinates.longitude = this.depot!.address!.coordinates.longitude;
        console.log(this.depotCoordinates.latitude)
      },
      (error) => {
        console.error('Error:', error);
      });
  }

  handleSelectedCoordinates(data: CoordinateEventData): void {
    this.coordinateList = data.coordinates;
    this.ordersToSend = data.orders;
    this.noCheckBoxSelected = this.coordinateList.length === 0;
  }

}

type CoordinateEventData = {
  coordinates: Point[];
  orders: OrderDTO[];
};
