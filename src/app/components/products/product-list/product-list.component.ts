import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';

// model
import { Product } from '../../../models/product';

//firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// service
import { ProductService } from '../../../services/product.service';

// toastr
import { ToastrService } from 'ngx-toastr';
// Import pdfmake-wrapper and the fonts to use
import { Item, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  selectedProduct: Product = new Product();

  // Arreglo para almacenar la informacion que se obtenga de la base de datos de firebase
  productList: Product[];
  Txtpdf: string;
  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  generatePDF(product: Product) {
    const pdf = new PdfMakeWrapper();
    //apartado de configuracion
    pdf.pageSize('A5');
    pdf.info({
      title: 'Ticket de Diegos Market',
      author: 'pdfmake-wrapper',
    });

    //cuerpo del pdf

    pdf.header(
      new Txt('*********DIEGOS MARKET*********').alignment('center').bold().end
    );

    pdf.add(
      new Txt('Final 53 Av. Norte, Alameda Roosvelt, #135').alignment('center')
        .end
    );
    pdf.add(
      new Txt('San Salvador, El Salvador')
        .alignment('justify')
        .alignment('center').end
    );
    pdf.add(
      new Txt('Ticket: ' + product.$key)
        .alignment('justify')
        .alignment('center').end
    );
    pdf.add(
      new Txt('Fecha:  ' + new Date()).alignment('justify').alignment('center')
        .end
    );
    pdf.add(
      new Table([
        ['Nombre Producto', 'Cantidad', 'Precio', 'Descuento', 'Total'],
        [
          product.category,
          product.cantidad,
          product.price,
          product.descuento,
          product.total,
        ],
      ])
        .alignment('center')
        .alignment('center').end
    );

    new Item({ text: 'item 1' }).listType('square').end,
      pdf.footer(
        new Txt('Gracias por Su compra, vuelva pronto!')
          .alignment('center')
          .bold().end
      );
    //funcion mandar pdf
    pdf.create().open();
  }

  onDelete($key: string) {
    if (confirm('Are you sure you want to delete it?')) {
      this.productService.deleteProduct($key);
      this.toastr.warning('Eliminación Exitosa', 'Producto Eliminado');
    }
  }

  onEdit(product: Product) {
    this.productService.selectedProduct = Object.assign({}, product);
  }

  /* 
    Cuando cargue la aplicación, que reciba toda la información con el método 'getProducts' del servicio de firebase
     pero ademas que utilice el metodo 'snapshotChanges' para estar atento a los cambios que tengas los datos en la
     base de datos de firebase, para recorrerlo con forEach. 
  
     Cada dato lo obtengo 'payload' y lo convierto en formato JSON y lo asigno a la variable 'x'
     let x = element.payload.toJSON();
  
     Se le asigna por cada elemento la llave de cada registro, en una propiedad llamada '$key'
     por que se necesita para luego eliminar el registro
     x["$key"] = element.key;
  
     Cuando ya se tiene el elemento se asigna a mi arreglo 'productList' para ser mostrado en mi pantalla list
     this.productList.push(x as Product);
  */
  ngOnInit() {
    return this.productService
      .getProducts()
      .snapshotChanges()
      .subscribe((item) => {
        this.productList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.productList.push(x as Product);
        });
      });
  }

  /* 
   Recibe una varible de tipo 'Product' para invocar el servicio de firebase, para actualizarlo
   Para no ocupar el doble enlace de datos ' [(ngModel)]' , se va utilizar 'Object.assign({}, product)'  
  */

  /* 
   Recibe la llave '$key' para eliminar el registro, invocando el metodo 'deleteProduct' del servicio de firebase
   ademas muestra un 'warning' con toastr
*/
}
