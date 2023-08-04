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

  listar_clientes_filtro_adminAdmin(tipo:any,filtro:any, token:string):Observable<any>{
    let headers = new HttpHeaders({'Authorization' : token}) //este authorization se accede en minusculas en el backend
    return  this.http.get(this.url+'listar_clientes_filtro_admin/'+ tipo +'/'+filtro , {headers: headers});
  }



}
