import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './components/cliente/cliente.component';
// import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    // NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
