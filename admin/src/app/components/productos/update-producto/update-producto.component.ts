import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast:any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent {

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
  public producto : any = {};
  public imgSelect : any | ArrayBuffer = '';
  public load_btn:boolean=false;//precargador
  public id:string='';
  public token:any;

  constructor( private _route: ActivatedRoute, private _productoService : ProductoService, private _adminService: AdminService, private _router: Router){
    this.token=_adminService.getToken();
  }

  ngOnInit():void{
    this._route.params.subscribe(
      paramans=>{
        this.id = paramans['id'];
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe({
          next: (response) => {
              console.log(response)
              // this._router.navigate(['/panel/productos']);
          },
          error: (error) =>{
            console.log(error);
          }
        })

      }
    )
  }

  actualizar(actualizarForm:any){

  }
  fileChangeEvent($event:any){

  }
}
