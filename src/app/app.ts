import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor( private authService: AuthService ,  @Inject(PLATFORM_ID) private platformId: any  ){
    
    

  }

  ngOnInit(): void {
    
   
  }

}
