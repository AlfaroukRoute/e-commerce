import { Injectable, signal, WritableSignal } from "@angular/core";
import { Sign } from "crypto";
import { BehaviorSubject, Observable, single } from "rxjs";

//! userData token ==> userData
// !! BehaviorSubject  

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
    // !!
    isLoading : WritableSignal<boolean> = signal(false); ;

    show() {
        this.isLoading.set(true);
    }

    hide() {
        this.isLoading.set(false);

    }

}