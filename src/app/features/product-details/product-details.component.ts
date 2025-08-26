import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/data.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {


     customOptions: OwlOptions = {
    loop: true,

    mouseDrag: true,
    touchDrag: true,

    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay : true ,
    // autoplayTimeout : 200 ,
    autoplaySpeed : 500,
    navText: ['hhhhh', 'prev'],


    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },

    


    nav: false
  }



  product : Product | null = null;
  isLoading = false;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {

        this.getProductDetails(id);
      }
    });
  }

  getProductDetails(id: string) {
    this.isLoading = true ;
    this.productService.getSpecificProduct(id).subscribe({
      next: (response) => {

        this.isLoading = false;
        if(response.data) {
          this.product = response.data;

        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  }
}
