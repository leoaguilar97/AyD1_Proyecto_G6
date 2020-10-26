import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BodegasComponent } from './bodegas/bodegas.component';
import { ProductosComponent } from './productos/productos.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { EditarUsuarioComponent } from './editarUsuario/editar-usuario.component';
import { LoginComponent } from './login/login.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SedesComponent } from './sedes/sedes.component';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';
import { EditarSedesComponent } from './editar-sedes/editar-sedes.component';
import { EditarBodegasComponent } from './editar-bodegas/editar-bodegas.component';
import { VerInventarioComponent } from './ver-inventario/ver-inventario.component';
import { ReportesvComponent } from './reportesDeVentas/reportesv/reportesv.component';
import { VentaComponent } from './venta/venta.component';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { DesgloseVentaComponent } from './desglose-venta/desglose-venta.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    UsuariosComponent,
    BodegasComponent,
    ProductosComponent,
    HomeComponent,
    EditarUsuarioComponent,
    EditarProductoComponent,
    LoginComponent,
    CategoriasComponent,
    SedesComponent,
    EditarCategoriasComponent,
    EditarSedesComponent,
    EditarBodegasComponent,
    ReportesvComponent
    VentaComponent
    DetalleVentaComponent,
    DesgloseVentaComponent
    VerInventarioComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
