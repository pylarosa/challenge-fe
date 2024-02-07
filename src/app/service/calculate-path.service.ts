import { Injectable } from '@angular/core';
import { Point } from '../dto/coordinate';
import { DepotDTO } from '../dto/depot';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatePathService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8081/api/v1/app'
  urlGetDepot: string = '/depot/getDepot'

  getDepot(): Observable<DepotDTO> {
    return this.http.get<DepotDTO>(this.baseUrl + this.urlGetDepot)
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  findOptimalRoute(depot: Point, coordinates?: Point[]): Point[] {
    const visited: Point[] = [];
    depot.id = "Coordinate Deposito Osmannoro"
    visited.push(depot)
    let currentPoint = depot;

    while (coordinates && coordinates.length > 0) {
      let shortestDistance = Infinity;
      let nearestPoint: Point | undefined;

      for (const point of coordinates) {
        const distance = this.calculateDistance(currentPoint.latitude, currentPoint.longitude, point.latitude, point.longitude);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestPoint = point;
        }
      }

      if (nearestPoint) {
        visited.push(nearestPoint);
        coordinates = coordinates.filter(point => point !== nearestPoint);
        currentPoint = nearestPoint;
      }
    }

    visited.push(depot);
    console.log(visited);
    return visited;
  }
}
