import { transition } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var JQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent {

  //variables////////////////////////////////////////////////////////
  public producto:any = {
    contenido:'',
  };
  public file : File | undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  //configuracion del text area especializado
  config:AngularEditorConfig={
    editable:true,
    spellcheck:true,
    height:'15rem',
    minHeight:'5rem',
    placeholder:"Descripcion especifica del producto",
    translate:'no',
    defaultParagraphSeparator:'p',
    defaultFontName:'Arial',
  };
  public token:any;
  public load_btn:boolean=false;//precargador

  //constructor/////////////////////////////////////////////////////////
  constructor(private _productoService:ProductoService, private _adminService:AdminService,private _router: Router){
    this.token = _adminService.getToken();
  }

  ngOnInit(){
  }


  registro(registroForm:any){

    if(registroForm.valid){
      this.load_btn = true;
      this._productoService.registro_producto_admin(this.producto,this.file,this.token).subscribe({
        next: (response) => {
            iziToast.show({
              title: 'Success',
              position:'topRight',
              message: 'Se registró correctamente el nuevo producto',
              titleColor:'#1DC74C'
            });
            this._router.navigate(['/panel/productos']);
        },
        error: (error) =>{
          console.log(error);
        }
      })
    }else{
      iziToast.show({
        title: 'Error',
        position:'topRight',
        message: 'Los datos del formulario no son validos',
        titleColor:'rgb(190, 37, 37)'
      })
    }
    this.load_btn=false;
      
  }

  //Recibimos la imagen
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
          
          this.file=imagen; ////////IGUALAMOS FILE A MLA IMAGEN QUE OBTENEMOS/////////////////////////////////

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
    
  }

}
