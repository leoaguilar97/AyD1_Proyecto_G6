import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioReportesService {

  url = "https://jsonplaceholder.typicode.com/posts"
  urlProducto = "https://api-erpp.herokuapp.com/api/reporte/producto"
  urlCategorias = "https://api-erpp.herokuapp.com/api/reporte/categoria"
  urlVendedor = "https://api-erpp.herokuapp.com/api/reporte/vendedor"
  urlDia = "https://api-erpp.herokuapp.com/api/reporte/dia"
  urlMes = "https://api-erpp.herokuapp.com/api/reporte/mes"
  urlAnio = "https://api-erpp.herokuapp.com/api/reporte/ano"
  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(this.url);
  }

  getProductos(tipo:string){
    return this.http.post(this.urlProducto,{
      'grafica': tipo
    });
  }

  getCategorias(tipo:string){
    return this.http.post(this.urlCategorias,{
      'grafica': tipo
    });
  }

  getVendedor(tipo:string){
    return this.http.post(this.urlVendedor,{
      'grafica': tipo
    });
  }

  getDia(tipo:string, dia:string){
    return this.http.post(this.urlDia,{
      'grafica': tipo,
      'dia': dia
    });
  }

  getMes(tipo:string, mes:string){
    return this.http.post(this.urlMes,{
      'grafica': tipo,
      'mes': mes
    });
  }

  getAnio(tipo:string, anio:string){
    return this.http.post(this.urlAnio,{
      'grafica': tipo,
      'ano': anio
    });
  }

}
