import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

//! userData token ==> userData
// !! BehaviorSubject  

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

    show() {
        this.isLoading.next(true);
    }

    hide() {
        this.isLoading.next(false);
    
    }

}