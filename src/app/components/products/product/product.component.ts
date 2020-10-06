import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lista } from "../../../models/lista";

//  Service 
import { ProductService } from '../../../services/product.service';
// Class
import { Product } from '../../../models/product';
// toastr
import { ToastrService } from 'ngx-toastr';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  Listas: Lista[] = [
    { id: 1, category: 'Platano', price: 1.25 },
    { id: 2, category: 'Melon', price: 1.75 },
    { id: 3, category: 'Aguacate', price: 1.00 },
    { id: 4, category: 'Tomate', price: 0.50 },
    { id: 5, category: 'Lechuga', price: 0.90 }
  ];
  categoria: string;
  ide: number;
  precio: number;
  total: number;
  visita:number;
  selectedProduct: Product = new Product();
  descuento:number=0;
  constructor(
    public productService: ProductService,
    public toastr: ToastrService
  ) { }

  // Cuando se levanta la aplicacion, llama al metodo del servicio firebase para traer los productos
  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
   
    this.descuento=0;
  }

  // Recibe un formulario del tipo NgForm, lo envia a guardar o actualizar , invocando el servicio Firebase
  // lo termina limpiando resetForm
  onSubmit(productForm: NgForm) {
  
    console.log("User = " + JSON.stringify(this.productService.selectedProduct));
    this.selectedProduct = this.productService.selectedProduct;
  
    if (productForm.value.$key == null){
      if(this.productService.selectedProduct.visita>=2 && this.productService.selectedProduct.visita <=5 ){
  
        this.productService.selectedProduct.descuento=0.05
      }
      else if(this.productService.selectedProduct.visita >=5){
    
        this.productService.selectedProduct.descuento=0.08
      }

      this.productService.insertProduct(this.selectedProduct);
      this.toastr.success('Operacion Exitosa', 'Producto Registrado');
    
    }
    
    else{
      this.productService.updateProduct(this.selectedProduct);
      this.toastr.success('Operación Exitosa', 'Producto Actualizado');//buscar este removido
    }

    this.resetForm(productForm);
    // this.toastr.success('Sucessful Operation', 'Product Registered');
  }

  // Para limpiar el formulario
  resetForm(productForm?: NgForm) {
    if (productForm != null)
      productForm.reset();
    this.productService.selectedProduct = new Product();
  }
descue(){
  if(this.visita>2||this.visita<5){
  
    this.productService.selectedProduct.descuento=0.05
  }
  else if(this.visita>5){

    this.productService.selectedProduct.descuento=0.08
  }
}
  capturar() {
 
    this.productService.selectedProduct.category = this.categoria;
    console.log(this.categoria);
   
    for (let index = 0; index < this.Listas.length; index++) {

      if (this.Listas[index].category == this.categoria) {

        this.ide = this.Listas[index].id;
        console.log(this.ide);
        this.precio = this.Listas[index].price;
        console.log(this.precio);
        this.productService.selectedProduct.id = this.ide;
        this.productService.selectedProduct.price = this.precio;

      }
      
      
      // console.log(this.ide);
    }


  }

}