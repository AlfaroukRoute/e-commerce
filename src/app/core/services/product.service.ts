import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product, Response } from "../models/data.interface";
import { environment } from "../../../environments/environment.development";

// !! product details 
// !! login , register 
//!  slider  

@Injectable({
  providedIn: 'root'
})
export class ProductService {


    constructor(private http: HttpClient){}




    // !!! todo create product interface
    getProducts(page : number = 1) : Observable<Response<Product>> {
      return  this.http.get<Response<Product>>(`${environment.baseUrl}/products?limit=40&page=${page}`)

    }

    // !!!
    getSpecificProduct(id: string): Observable<{data: Product}> {
      return this.http.get<{data : Product}>(`${environment.baseUrl}/products/${id}`)

    }

 
}