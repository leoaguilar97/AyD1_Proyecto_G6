import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { BodegasComponent } from './bodegas/bodegas.component';
import { HomeComponent } from './home/home.component';
import { EditarUsuarioComponent } from './editarUsuario/editar-usuario.component';
import { LoginComponent } from './login/login.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { SedesComponent } from './sedes/sedes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordions', component: AccordionsComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'progressbar', component: ProgressbarComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'dropdowns', component: DropdownComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'tabs', component: TabsComponent },
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
  { path: 'proveedores', component: ProveedoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
