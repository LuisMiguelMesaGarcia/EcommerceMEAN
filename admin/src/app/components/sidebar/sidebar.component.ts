import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(){}
  ngOnInit(){
    //con esto evitamos que se al dar atras sin cerrar el modal, quede abierto
    let backDrop = document.querySelector('.modal-backdrop') as HTMLDivElement;
    if(backDrop !== null){
      backDrop.remove();
    }
    //con esto de arriba evitamos que se al dar atras sin cerrar el modal, quede abierto
  }
}
