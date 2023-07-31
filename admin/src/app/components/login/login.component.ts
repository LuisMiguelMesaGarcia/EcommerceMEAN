import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var JQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user : any = {};
  public usuario: any={};//se guarda el usuario logeado
  public token: any = '';

  constructor(private _adminService:AdminService, private router:Router){
    this.token = this._adminService.getToken();//trae el token el localhost
  }

  ngOnInit():void{
    //si hay token redireccionamos al inicio
    if(this.token){
      this.router.navigate(['/']);
    }
  }

  login(loginForm:any){
    if(loginForm.valid){
      //el user se llena en el frontEnd en el ngModel de la etiqueta input
      this._adminService.loginAdmin(this.user).subscribe(
        response => {
          if(response.data==undefined){
            iziToast.show({
              title: 'Error',
              position:'topRight',
              message: response.message,
              titleColor:'rgb(190, 37, 37)'
            })
          }else{
            this.usuario=response.data;
            localStorage.setItem('token', response.token)
            localStorage.setItem('_id', response.data._id)
            
            this.router.navigate(['/']);
          }
        },error=>{
          console.log(error);
        }
      );
    }else{
      iziToast.show({
        title: 'Error',
        position:'topRight',
        message: 'Los datos del formulario no son validos',
        titleColor:'rgb(190, 37, 37)'
      })
    }
  }
}
