import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.entrar();   // Cambiar para deploy
  }


    // Cambiar para deploy

  entrar() {
    this.http.post('https://api-erpp.herokuapp.com/api/auth/signin',
        {
          'correo': 'admin@ayd.com',
          'password': '1234',
        }).toPromise().then((data: any) => {
          if (data != null) {
            localStorage.setItem('id', data.id);
          }
        });
  }

}
