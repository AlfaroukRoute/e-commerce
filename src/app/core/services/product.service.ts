import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  mergeAll,
  mergeMap,
  retry,
  delay,
  catchError,
  of,
  throwError,
} from 'rxjs';
import { Product, Response } from '../models/data.interface';
import { environment } from '../../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';

// !! product details
// !! login , register
//!  slider

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private toaster = inject(ToastrService);

  constructor(private http: HttpClient) {}

  // from["ahmed" , ",aj"] of

  // !!! todo create product interface
  getProducts( page: number = 1): Observable<any> {
    return this.http
      .get<any>(
        `${environment.baseUrl}/products?limit=40&page=${page}`
      )
      .pipe();
  }

  newGetProducts(price: string, page: number = 1): Observable<any> {
    return this.http
      .get<any>(
        `${environment.baseUrl}/products?limit=40&page=${page}&price[gte]=${price}`
      )
      .pipe();
  }


  // !!!
  getSpecificProduct(id: string): Observable<{ data: Product }> {
    return this.http.get<{ data: Product }>(
      `${environment.baseUrl}/products/${id}`
    );
  }
  getSpecificCategory(id: string): Observable<{ data: Product }> {
    return this.http.get<{ data: Product }>(
      `${environment.baseUrl}/categories/${id}`
    );
  }

  getCategoryDEtailsByProductId(id: string) {
    return this.http
      .get<{ data: Product }>(`${environment.baseUrl}/products/${id}`)
      .pipe(
        mergeMap((res: any) => {
          console.log(res);

          return this.http
            .get<{ data: Product }>(
              `${environment.baseUrl}/categories/${res.data.category._id}`
            )
            .pipe(
              map((res2) => {
                return { categoryDEtails: res2, productDetails: res };
              })
            );
        })
      );
  }
}
