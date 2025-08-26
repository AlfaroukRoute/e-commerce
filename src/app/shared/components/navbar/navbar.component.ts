import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive , CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  productService = inject(ProductService);

  pages = [
    { title: 'Home', path: '/home' },
    { title: 'Products', path: '/products' },
    { title: 'Categories', path: '/categories' },
    { title: 'Brands', path: '/brands' },
    { title: 'Cart', path: '/cart' }
  ]

  authPages = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' }
  ]


  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

}
