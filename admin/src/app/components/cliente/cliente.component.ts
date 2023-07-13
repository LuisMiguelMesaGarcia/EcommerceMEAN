import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  constructor(private _clienteService:ClienteService){

  }

  ngOnInit():void{
    this._clienteService.loginlistar_clientes_filtro_adminAdmin().subscribe(
      response=>{
        console.log(response)
      },
      error=>{
        console.log(error)
      }
    )
  }



}
