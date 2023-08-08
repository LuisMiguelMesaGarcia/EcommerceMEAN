import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { AdminService } from 'src/app/services/admin.service';
declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  public clientes: Array<any> = []; //todos los clientes
  public filtro_apellido = '';// con el ngModule le damos valor a estos filtros en el html
  public filtro_correo = '';
  public page!:number;//para el paginadore
  public token:any;
  public load_data:boolean=true;//precargador
  // public page = 1;
  // public pageSize = 1;



  constructor(private _clienteService:ClienteService, private _adminService:AdminService){
    this.token=_adminService.getToken();
  }

  ngOnInit():void{
    this.init_Data(null,null)

  }

  init_Data(tipo:any, filtro:any){
    //GET
    this.load_data=true;
    this._clienteService.listar_clientes_filtro_adminAdmin(tipo, filtro, this.token).subscribe(
      response=>{
        this.clientes = response.data
        this.load_data=false;//se pone en falso para que muestre el listado, si no, muestra el spinner
      },
      error=>{
        console.log(error)
      }
    )
  }

  filtro(tipo:any){
    if(tipo == 'apellido'){
      if(this.filtro_apellido){
        this.init_Data(tipo,this.filtro_apellido)
      }else{
        this.init_Data(null,null)
      }
      
    }else if(tipo == 'correo'){
      if(this.filtro_correo){
        this.init_Data(tipo,this.filtro_correo)
      }else{
        this.init_Data(null,null)
      }
    }

  }

  eliminar(id:string){
    this._clienteService.eliminar_cliente_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'Success',
          position:'topRight',
          message: 'Se eliminó correctamente el cliente',
          titleColor:'#1DC74C'
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_Data(null,null);

      },error=>{
        console.log(error);
      }
    )
  }



}
