import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class ServicioReportesService {

  url = "https://jsonplaceholder.typicode.com/posts"
  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(this.url);
  }

}
