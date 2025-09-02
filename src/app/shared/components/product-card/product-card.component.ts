import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/data.interface';
import { RouterLink } from "@angular/router";
import { CurrencyPipe, DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { TestPipe } from '../../pipes/test-pipe';
import { SeeMorePipe } from '../../pipes/see-more-pipe';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink  , SeeMorePipe , UpperCasePipe , LowerCasePipe , TitleCasePipe , CurrencyPipe , DatePipe , TestPipe] ,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  
  today = new Date();

  // !! service || home || product
  @Input({required : true})
  product: Product = {} as Product; 

   constructor(
     
      private cartService: CartService,
      private toaster: ToastrService
    ) {}
  


   addProductCart(pID: string) {
    this.cartService.addProductToCart(pID).subscribe({
      next: (res) => {
        this.toaster.success(res.message);
      },
      error: (err) => {
        this.toaster.error(err.message);
      },
    });
  }



  // formateDate(date : Date){
  //   return new Intl.DateTimeFormat('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   }).format(date);
  // }

}
