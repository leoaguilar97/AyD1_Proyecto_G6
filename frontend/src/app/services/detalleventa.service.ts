import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetalleventaService {

  constructor(private http: HttpClient,private router: Router) { }
  
  getVentas() {
      let apiUrl = 'https://api-erpp.herokuapp.com/api/venta';
      return this.http.get<any>(apiUrl, {})
          .pipe(map(data => {
              return data;
          }));
  }

}
