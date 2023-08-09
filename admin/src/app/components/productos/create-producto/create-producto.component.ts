import { Component } from '@angular/core';
declare var JQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent {

  editorConfig={
    base_url:'/tintmce',
    suffix:'.min',
    plugins:'lists link image table wordcount'
  }
  public producto:any = {
    
  };
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
          reader.onload = e =>{//aqui esperamos el resultado del readAsDataURL
            this.imgSelect = reader.result;
            // console.log(this.imgSelect);
          }
          reader.readAsDataURL(imagen);//aqui nos da el url en base64
          
          $('#input-portada').text(imagen.name);//jquery para poner el nombre de la imagen en el input
          this.file=imagen;

        }else{//else tipo de iamgen
          iziToast.show({
            title: 'Error',
            position:'topRight',
            message: 'el archivo debe ser una imagen',
            titleColor:'rgb(190, 37, 37)'
          })

          $('#input-portada').text("Seleccionar imagen");
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
        $('#input-portada').text("Seleccionar imagen");
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
      $('#input-portada').text("Seleccionar imagen");
      this.imgSelect = 'assets/img/01.jpg'
      this.file=undefined;
    }//fin else existencia de archivo
    
    console.log(this.file);
  }

}
