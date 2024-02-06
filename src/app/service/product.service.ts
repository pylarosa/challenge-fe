import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from '../dto/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:8081/api/v1/app'
  urlProductList = '/products/getProducts'
  urlProductListByOrder = '/products/getProduct/'
  totalOrderPrice: number = 0;

  selectedProducts: ProductDTO[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.baseUrl + this.urlProductList)
  }

  getProductByOrder(orderId: string): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.baseUrl + this.urlProductListByOrder + orderId)
  }

  getTotal(): number {
    this.selectedProducts.forEach(product => {
     this.totalOrderPrice += product.price * (product.quantity || 0);
    });
    return this.totalOrderPrice;
  }
}
