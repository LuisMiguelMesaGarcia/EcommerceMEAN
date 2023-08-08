import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard'
import { ClienteComponent } from './components/cliente/cliente.component';
import { CreateClienteComponent } from './components/cliente/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/cliente/edit-cliente/edit-cliente.component';


const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch:'full'},
  {path:'inicio', component: InicioComponent, canActivate: [AdminGuard]},
  {path:"panel", children:[
    {path:'clientes', component: ClienteComponent, canActivate:[AdminGuard]},
    {path:'clientes/registro', component: CreateClienteComponent, canActivate:[AdminGuard]},
    {path:'clientes/:id', component: EditClienteComponent, canActivate:[AdminGuard]}
  ]},
  {path:"login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
