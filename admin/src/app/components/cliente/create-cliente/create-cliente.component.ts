import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast:any;
@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent {

  public cliente : any = {
    genero : ''
  }; //este objeto se llena en el HTML con el ngModule
  public token:any;

  constructor(private _clienteService:ClienteService, private _adminService: AdminService,private _router: Router){
    this.token=_adminService.getToken();
  }

  ngOnInit():void{

  }


  //el registroForm se crea en el HTML
  resgistro(registroForm:any){
    if(registroForm.valid){
      this._clienteService.registroClienteAdmin(this.cliente,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'Success',
            position:'topRight',
            message: 'Se registró correctamente el nuevo cliente',
            titleColor:'#1DC74C'
          });
          this.cliente={
            genero:'',
            nombre:'',
            apellido:'',
            f_nacimiento:'',
            telefono:'',
            email:'',
          }
          this._router.navigate(['/panel/clientes'])
        },error=>{
          console.log(error);
        }
      )
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
