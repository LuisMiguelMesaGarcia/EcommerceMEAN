import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast:any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent {

  public cliente:any={};
  public id:string='';
  public token:any;

  constructor(private _route : ActivatedRoute, private _clienteService:ClienteService, private _amdminService:AdminService, private _router: Router){
    this.token=_amdminService.getToken();
  }

  ngOnInit(){
    this._route.params.subscribe(
      params=>{
        this.id=params['id'];
        this._clienteService.obtener_cliente_admin(this.id, this.token).subscribe(
          response=>{
            //validacion de que existe el registro
            if(response.data==undefined){
              this.cliente=undefined;
            }else{
              this.cliente=response.data;
            }
          },
          error=>{

          }
        )
      }
    )
  }

  actualizar(updateForm:any){

    if(updateForm.valid){

      this._clienteService.actualizar_cliente_admin(this.id,this.cliente,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'Success',
            position:'topRight',
            message: 'Se actualizaron los datos correctamente',
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

  }//funcion actualizar fin

}
