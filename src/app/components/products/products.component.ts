import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Lista } from "../../models/lista";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
// Listas: Lista[]=[
//   {idprod: 1,descprod: 'Platano',precio: 5},
//   {idprod: 2,descprod: 'Melon',precio: 3},
//   {idprod: 3,descprod: 'Aguacate',precio: 1},
//   {idprod: 4,descprod: 'Tomate',precio: 2},
//   {idprod: 5,descprod: 'Lechuga',precio: 4}
// ];
  constructor(public authService: AuthService) { }


  ngOnInit(): void {
  }

}
