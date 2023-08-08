import { Component } from '@angular/core';
declare var iziToast:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent {

  public producto:any = {};
  public file : File | undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';

  constructor(){}

  ngOnInit(){

  }

  registro(registroForm:any){

    if(registroForm.valid){

    }else{
      iziToast.show({
        title: 'Error',
        position:'topRight',
        message: 'Los datos del formulario no son validos',
        titleColor:'rgb(190, 37, 37)'
      })
    }
      
  }

  //cuando hay cambio en el input de la imagen
  fileChangeEvent(event:any):void{
    var imagen;
    if(event.target.files && event.target.files[0]){//validador existencia de archivo
      imagen = <File>event.target.files[0];

      if(imagen.size <= 4000000){//validador tamaño imagen

        if(imagen.type == 'image/png' || imagen.type == 'image/webp' || imagen.type == 'image/jpn' || imagen.type == 'image/jpeg' || imagen.type == 'image/gif'){//validador tipo de imagen

          const reader = new FileReader();
          reader.onload = e =>{
            this.imgSelect = reader.result;
            // console.log(this.imgSelect);
          }
          reader.readAsDataURL(imagen);
          
          this.file=imagen;

        }else{//else tipo de iamgen
          iziToast.show({
            title: 'Error',
            position:'topRight',
            message: 'el archivo debe ser una imagen',
            titleColor:'rgb(190, 37, 37)'
          })
          this.imgSelect = 'assets/img/01.jpg'
          this.file=undefined;
        }//fin else imagen
        
      }else{//else tamaño
        iziToast.show({
          title: 'Error',
          position:'topRight',
          message: 'la imagen no puede superar los 4MB',
          titleColor:'rgb(190, 37, 37)'
        })
        this.imgSelect = 'assets/img/01.jpg'
        this.file=undefined;
      }//fin else tamaño

    }else{//else existencia de archivo
      iziToast.show({
        title: 'Error',
        position:'topRight',
        message: 'No hay una imagen de envio',
        titleColor:'rgb(190, 37, 37)'
      })
      this.imgSelect = 'assets/img/01.jpg'
      this.file=undefined;
    }//fin else existencia de archivo
    
    console.log(this.file);
  }

}
