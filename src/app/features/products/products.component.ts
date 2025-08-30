import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/data.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { UpperCasePipe } from '@angular/common';
import { FilterListPipe } from '../../shared/pipes/filter-list-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [FormsModule, ProductCardComponent , FilterListPipe , NgxPaginationModule , UpperCasePipe]  ,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [];
  term :string ='';


  isLoading = false;
  errMsg = "" ;

  pageSize = 10 ;
  currentPage = 1 ;
  totalItems = 0;
  constructor(private productService: ProductService) {
  }

  // !!!!
  ngOnInit(): void {
    this.getProducts();//! 1
  }

  getProducts(page: number = 1) {this.isLoading = true ;
    this.productService.getProducts(page).subscribe({
      next: (res) => {
        this.currentPage =  res.metadata.currentPage ;
        this.totalItems = res.results ;
        this.pageSize = res.metadata.limit ;



        this.isLoading = false;
        if (res.data.length > 0) {
          this.products = res.data;
        }
      },
      // !!! global interceptor
      error: (err) => {
        this.isLoading = false;
        this.errMsg = "Failed to load products";

        switch (err.status) {
          case 404:
            this.errMsg = "Products not found";
            break;
          case 500:
            this.errMsg = "Server error";
            break;
          default:
            this.errMsg = "Unknown error";
        }
      },
    });
  }







  pageChanged(event:any){
    console.log(event);
    this.getProducts(event);
  }
}
