import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }
  title = 'star-admin-angular';
  logueado = false;
  url: String;

  ngOnInit() {
    if (localStorage.getItem('id') === null) {
      this.logueado = true;  // Cambiar para deploy
    } else {
      this.logueado = true;
    }
  }
}
