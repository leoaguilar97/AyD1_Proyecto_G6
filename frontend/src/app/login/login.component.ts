import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private location: Location) { }
  correo: string;
  contra: string;

  url: String;

  ngOnInit() {
  }

  entrar() {
    this.http.post('https://api-erpp.herokuapp.com/api/auth/signin',
        {
          'correo': this.correo,
          'password': this.contra,
        }).toPromise().then((data: any) => {
          console.log(data);
          if (data != null) {
            localStorage.setItem('id', data.id);
            this.router.navigate(['home']);
          }
        });
  }
  cancelar() {
    console.log('cancelar');
  }

}
