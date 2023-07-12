import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';


const routes: Routes = [
  {path:"", component: InicioComponent}//el path se deja vacio proque queremos que sea la pag de inicio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
