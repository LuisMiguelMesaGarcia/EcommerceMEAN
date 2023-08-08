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
  
  registroClienteAdmin(data:any,token:string):Observable<any>{
    let headers = new HttpHeaders({'Authorization' : token}) //este authorization se accede en minusculas en el backend
    return  this.http.post(this.url+'registroClienteAdmin',data,{headers: headers});
  }
  
  obtener_cliente_admin(id:string,token:string):Observable<any>{
    let headers = new HttpHeaders({'Authorization' : token}) //este authorization se accede en minusculas en el backend
    return  this.http.get(this.url+'/obtener_cliente_admin/'+id,{headers: headers});
  }
  actualizar_cliente_admin(id:string,data:any,token:string):Observable<any>{
    let headers = new HttpHeaders({'Authorization' : token}) //este authorization se accede en minusculas en el backend
    return  this.http.put(this.url+'/actualizar_cliente_admin/'+id,data,{headers: headers});
  }
  eliminar_cliente_admin(id:string,token:string):Observable<any>{
    let headers = new HttpHeaders({'Authorization' : token}) //este authorization se accede en minusculas en el backend
    return  this.http.delete(this.url+'/eliminar_cliente_admin/'+id,{headers: headers});
  }

  


}
