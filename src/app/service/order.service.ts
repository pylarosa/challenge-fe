import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { OrderDTO, OrderFilterDTO, OrderPatchDTO, Status } from '../dto/order';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnInit {
  baseUrl = 'http://localhost:8081/api/v1/app'
  urlOrderList = '/orders/getOrders'
  urlInsertOrder = '/orders/insertOrder'
  urlFilterOrder = '/orders/get-filtered-orders'
  urlEditOrder = '/orders/update-order/'

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
    // Implement a mapping logic here based on your server values
    switch (statusString) {
      case 'PRESO_IN_CARICO': return Status.PRESO_IN_CARICO;
      case 'PARTITO': return Status.PARTITO;
      // Add more cases for other status values
      default: return Status.PRESO_IN_CARICO; // Default to a sensible value
    }
  }

  filterOrders(orderFilter: OrderFilterDTO): Observable<OrderDTO[]> {
    const payload = orderFilter.status === "" ? { ...orderFilter, status: undefined} : orderFilter;
    return this.http.post<OrderDTO[]>(this.baseUrl + this.urlFilterOrder, payload)

  }

  randomCoordinates(): { latitude: number; longitude: number } {
    // Florence coordinates
    const florenceLatitude = 43.7696;
    const florenceLongitude = 11.2558;

    // Define the radius in kilometers (e.g., 20km)
    const radiusKm = 50;

    // Convert the radius to degrees - via earth circ.
    const radiusInDegrees = radiusKm / 111.32;

    // Generate random angles for latitude and longitude within the specified range
    const randomLatitude = florenceLatitude + (Math.random() * 2 - 1) * radiusInDegrees;
    const randomLongitude = florenceLongitude + (Math.random() * 2 - 1) * radiusInDegrees;

    // Return the random coordinates
    return { latitude: Number(randomLatitude.toFixed(5)), longitude: Number(randomLongitude.toFixed(5)) };
  }
}
