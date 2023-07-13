import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url;

  constructor(private http: HttpClient) { 
    this.url=GLOBAL.url;
  }

  loginAdmin(data:any):Observable<any>{
    // let header = new HttpHeaders().set('Content-Type','application/json'); //en el curso hace esto, no se para que y lo pasa en el post con una coma(,) despues del body(data)
    return  this.http.post(this.url+'loginAdmin',data);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  public isAuthenticate(allowedRoles: string[]):boolean{
    const token:any = localStorage.getItem('token');

    
    if(!token){
      return false;
    }

    const helper = new JwtHelperService();
    var decodedToken = helper.decodeToken(token);

    if(!decodedToken){
      console.log('no valido');
      localStorage.removeItem('token')
      return false;
    }
    return allowedRoles.includes(decodedToken['rol']);
  }

}
