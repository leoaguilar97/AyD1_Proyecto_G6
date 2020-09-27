import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  // Declaraciones
  usuarios: any;
  nuevo_nombre: string;
  nuevo_apellido: string;
  nuevo_dpi: string;
  nuevo_correo: string;
  nuevo_fechaNacimiento: string;
  nuevo_direccion: string;
  nuevo_numeroCelular: string;
  nuevo_rol = 'Administrador';
  id = String(this.route.snapshot.params['dpi_usuario']);

  ngOnInit() {
    this.getInfoUsuario();
  }
  getInfoUsuario() {
    this.http.get('https://api-erpp.herokuapp.com/api/usuario/' + this.id)
      .toPromise().then((data: any) => {
        this.nuevo_nombre = data.nombre;
        this.nuevo_apellido = data.apellido;
        this.nuevo_dpi = data.dpi;
        this.nuevo_correo = data.correo;
        this.nuevo_fechaNacimiento = this.getDate(String(data.fechaNacimiento));
        this.nuevo_direccion = data.direccion;
        this.nuevo_numeroCelular = data.numeroCelular;
        this.nuevo_rol = data.roles;
      });
  }
  getDate(cadena: string): string {
    return String(cadena.substr(5, 2)) + '/' + String(cadena.substr(8, 2) + '/' + String(cadena.substr(0, 4)));
  }
  modificar() {
    this.http.put('https://api-erpp.herokuapp.com/api/usuario/' + this.id,
      {
        'nombre': this.nuevo_nombre,
        'apellido': this.nuevo_apellido,
        'fechaNacimiento': this.nuevo_fechaNacimiento,
        'direccion': this.nuevo_direccion,
        'numeroCelular': this.nuevo_numeroCelular,
        'roles': [this.nuevo_rol]
      }).toPromise().then((data: any) => {
        console.log(data);
        this.router.navigate(['usuarios']);
      });
  }
}
