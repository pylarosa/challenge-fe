import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { OrderDTO, OrderFilterDTO, OrderPatchDTO, Status } from '../dto/order';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnInit {
  baseUrl = 'http://localhost:8081/api/v1/app'
  urlOrderList = '/orders/getOrders'
  urlInsertOrder = '/orders/insertOrder'
  urlFilterOrder = '/orders/get-filtered-orders'
  urlEditOrder = '/orders/update-order'

  private orderUpdatedSource = new Subject<void>();

  orderUpdated$ = this.orderUpdatedSource.asObservable();

  emitOrderUpdated() {
    this.orderUpdatedSource.next();
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(this.baseUrl + this.urlOrderList)
  }

  insertOrder(newOrder: OrderDTO): Observable<OrderDTO> {
    return this.http.post<OrderDTO>(this.baseUrl + this.urlInsertOrder, newOrder);
  }

  updateOrder(editedOrder: OrderPatchDTO): Observable<OrderDTO>{
    return this.http.patch<OrderDTO>(this.baseUrl + this.urlEditOrder, editedOrder);
  }

  mapOrderStatusFromServer(statusString: string): Status {
    switch (statusString) {
      case 'PRESO_IN_CARICO': return Status.PRESO_IN_CARICO;
      case 'IN CONSEGNA': return Status.IN_CONSEGNA;
      case 'CONSEGNATO': return Status.CONSEGNATO;
      
      default: return Status.PRESO_IN_CARICO; 
    }
  }

  filterOrders(orderFilter: OrderFilterDTO): Observable<OrderDTO[]> {
    const payload = orderFilter.status === "" ? { ...orderFilter, status: undefined} : orderFilter;
    return this.http.post<OrderDTO[]>(this.baseUrl + this.urlFilterOrder, payload)

  }

  // Based on the depot coordinates (statically set in this instance to avoid another server call),
  // this function generates random coordinates in a 20Km radius from Depot by randomly choose 
  // angles for lat and long whitin the specified range
  randomCoordinates(): { latitude: number; longitude: number } {
    const depotLatitude = 43.80873;
    const depotLongitude = 11.175819;
    const radiusKm = 20;
    // Convert the radius to degrees - via the earth circ.
    const radiusInDegrees = radiusKm / 111.32;
    const randomLatitude = depotLatitude + (Math.random() * 2 - 1) * radiusInDegrees;
    const randomLongitude = depotLongitude + (Math.random() * 2 - 1) * radiusInDegrees;

    return { latitude: Number(randomLatitude.toFixed(5)), longitude: Number(randomLongitude.toFixed(5)) };
  }
}
