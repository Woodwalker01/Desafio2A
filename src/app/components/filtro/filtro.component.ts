import { Component, OnInit} from '@angular/core';
import { AuthService } from "../../services/auth.service";

// model
import { Product } from 'src/app/models/product';

// service
import { ProductService } from 'src/app/services/product.service';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  filtroList: Product[];
  constructor(private productService: ProductService,
    private toastr: ToastrService,
    public authService: AuthService) {}
  filterpost = "";
  ngOnInit() {
    return this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.filtroList = [];
        item.forEach(element => {   let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.filtroList.push(x as Product);
        });
      });
  }

  onEdit(product: Product) {
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string) {
    if (confirm('Are you sure you want to delete it?')) {
      this.productService.deleteProduct($key);
      this.toastr.warning('Eliminación Exitosa', 'Producto Eliminado');
    }
  }

}
