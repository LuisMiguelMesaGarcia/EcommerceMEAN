import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import  { AdminService } from 'src/app/services/admin.service'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _adminService:AdminService, private _router:Router){

  }
  canActivate():boolean{ //esto esta ligado con el inicio en el routing
    if(!this._adminService.isAuthenticate(['admin'])){//si es falso, me redirecciona de nuevo al login
      this._router.navigate(['/login'])
      return false;
    }
    return true;
  }

}
