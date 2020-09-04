import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  // Declaraciones
  usuarios = [];
  nuevo_nombre: string;
  nuevo_apellido: string;
  nuevo_dpi: string;
  nuevo_correo: string;
  nuevo_fechaNacimiento: string;
  nuevo_direccion: string;
  nuevo_numeroCelular: string;
  nuevo_password1: string;
  nuevo_password2: string;
  nuevo_rol = 'Administrador';


  ngOnInit() {
    this.cargarUsuarios();
  }
  cargarUsuarios(): boolean {
    this.http.get('https://api-erpp.herokuapp.com/api/usuario')
      .toPromise().then((data: any) => {
        this.usuarios = data;
      });
    return true;
  }
  editar(id: string) {
    this.router.navigate(['editarUsuario', id]);
  }
  eliminar(id: string) {
    const direccion = 'https://api-erpp.herokuapp.com/api/usuario/' + id;
    this.http.delete(direccion)
    .toPromise().then((data: any) => {
      console.log(data);
      this.cargarUsuarios();
    });
  }
  agregar() {
    if (this.passwordIsCorrect()) {
      this.http.post('https://api-erpp.herokuapp.com/api/usuario',
        {
          'nombre': this.nuevo_nombre,
          'apellido': this.nuevo_apellido,
          'dpi': this.nuevo_dpi,
          'correo': this.nuevo_correo,
          'fechaNacimiento': this.nuevo_fechaNacimiento,
          'direccion': this.nuevo_direccion,
          'numeroCelular': this.nuevo_numeroCelular,
          'password': this.nuevo_password1,
          'roles': [this.nuevo_rol]
        }).toPromise().then((data: any) => {
          console.log(data);
          this.cancelar();
          this.cargarUsuarios();
        });
    } else {
    }
  }
  cancelar() {
    this.nuevo_nombre = null;
    this.nuevo_apellido = null;
    this.nuevo_dpi = null;
    this.nuevo_correo = null;
    this.nuevo_fechaNacimiento = null;
    this.nuevo_direccion = null;
    this.nuevo_password1 = null;
    this.nuevo_password2 = null;
    this.nuevo_numeroCelular = null;
    this.nuevo_rol = 'Administrador';
  }
  passwordIsCorrect() {
    return this.nuevo_password2 = this.nuevo_password2;
  }
}
