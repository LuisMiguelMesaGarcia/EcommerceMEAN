import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard'
import { ClienteComponent } from './components/cliente/cliente.component';


const routes: Routes = [
  {path:'', component: InicioComponent, canActivate: [AdminGuard]},
  {path:"panel", children:[
    {path:'clientes', component: ClienteComponent, canActivate:[AdminGuard]}
  ]},
  {path:"login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
