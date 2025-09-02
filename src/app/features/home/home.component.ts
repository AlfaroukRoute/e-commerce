import { Component } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { Category, Product } from '../../core/models/data.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../core/services/category.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: Product[] = [];
  categories: Category[] = [];

  isLoading = false;

  errMsg = '';
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private toaster: ToastrService
  ) {}

  // !!!!
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.data.length > 0) {
          this.products = res.data;
        }
      },
      // !!! global interceptor
      error: (err) => {
        this.isLoading = false;
        this.errMsg = 'Failed to load products';

        switch (err.status) {
          case 404:
            this.errMsg = 'Products not found';
            break;
          case 500:
            this.errMsg = 'Server error';
            break;
          default:
            this.errMsg = 'Unknown error';
        }
      },
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,

    mouseDrag: true,
    touchDrag: true,

    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    // autoplayTimeout : 200 ,
    autoplaySpeed: 500,
    navText: ['hhhhh', 'prev'],

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 7,
      },
    },

    margin: 10,

    nav: false,
  };

 
}
