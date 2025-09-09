import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  viewChild,
} from '@angular/core';
import { debounce, debounceTime, distinct, distinctUntilChanged, filter, from, fromEvent, interval, Observable, of, timer } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

//! new Observable of
// || from of interval timer fromEvent  || throwError
//! pipe

@Component({
  selector: 'app-brands',
  imports: [ReactiveFormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  productService = inject(ProductService);
  inputControl = new FormControl('' );

  constructor() {}

  ngOnInit(): void {
    this.inputControl.valueChanges
    .pipe(
      debounceTime(200),
      distinctUntilChanged()
    )
    .subscribe((value) => {

      // !!!!
      
      this.productService.newGetProducts(value || '0').subscribe((res) => {
        console.log(res, 'res from brands with price');
      });


    });
  }
}
