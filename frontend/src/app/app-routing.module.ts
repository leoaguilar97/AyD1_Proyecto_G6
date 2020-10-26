import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { BodegasComponent } from './bodegas/bodegas.component';
import { HomeComponent } from './home/home.component';
import { EditarUsuarioComponent } from './editarUsuario/editar-usuario.component';
import { LoginComponent } from './login/login.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { SedesComponent } from './sedes/sedes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';
import { EditarSedesComponent } from './editar-sedes/editar-sedes.component';
import { EditarBodegasComponent } from './editar-bodegas/editar-bodegas.component';
import { VerInventarioComponent } from './ver-inventario/ver-inventario.component';
import { VentaComponent } from './venta/venta.component';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { DesgloseVentaComponent } from './desglose-venta/desglose-venta.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'bodegas', component: BodegasComponent },
  { path: 'home', component: HomeComponent },
  { path: 'editarUsuario/:dpi_usuario', component: EditarUsuarioComponent },
  { path: 'editarProducto/:id', component: EditarProductoComponent },
  { path: 'editarCategorias/:id', component: EditarCategoriasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sedes', component: SedesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'editarSede/:id', component: EditarSedesComponent},
  { path: 'editarBodegas/:id', component: EditarBodegasComponent},
  { path: 'verInventario/:id', component: VerInventarioComponent},
  { path: 'venta', component: VentaComponent},
  { path: 'detalleventa', component: DetalleVentaComponent},
  { path: 'desgloseventa/:id', component: DesgloseVentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
