import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public url;

  constructor(private http: HttpClient) { 
    this.url=GLOBAL.url;
  }

  loginlistar_clientes_filtro_adminAdmin():Observable<any>{
    return  this.http.get(this.url+'listar_clientes_filtro_admin');
  }



}
