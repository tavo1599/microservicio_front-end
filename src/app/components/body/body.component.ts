import { Component } from '@angular/core';
import { Producto } from 'src/app/modells/Producto';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
productos: Array<Producto>
formularioProducto: FormGroup
visible: boolean

constructor (private fb: FormBuilder, private pService: ProductoService){
  this.productos = new Array<Producto>()
  this.visible = false
  this.formularioProducto =  fb.group({
    id: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    
  })
}

//crear producto
crearProducto(){
  if(this.formularioProducto.valid){
    let  producto = new Producto()
    producto.id = this.formularioProducto.get('id')?.value
    producto.nombre = this.formularioProducto.get('nombre')?.value
    this.pService.crearProducto(producto).subscribe(res=> {
      this.getProductos()
      this.formularioProducto.reset()
    })
  }
}
  getProductos(){
    this.pService.getProductos().subscribe(res =>{
      this.productos = res
    })
  }
   
  eliminarProducto(idProducto: number){
    this.pService.eliminarProducto(idProducto).subscribe(res => {
    this.getProductos()
    })
  }

  actualizarProducto(){
    if(this.formularioProducto.valid){
      let  producto = new Producto()
      producto.id = this.formularioProducto.get('id')?.value
      producto.nombre = this.formularioProducto.get('nombre')?.value
      
      this.pService.actualizarProducto(producto).subscribe(res=> {
        this.getProductos()
        this.formularioProducto.reset()
        this.visible = !this.visible
      })
    }
  }

  activador(producto: Producto){
    this.formularioProducto.get('id')?.setValue(producto.id)
    this.formularioProducto.get('nombre')?.setValue(producto.nombre)
    
    this.visible = !this.visible
  }
}

