import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { GlobalLoaderComponent } from './shared/components/global-loader/global-loader.component';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    GlobalLoaderComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private loaderService: LoaderService
  ) {
    loaderService.isLoading.subscribe({
      next: (flag) => {
        this.isLoading = flag;
      },
    });
  }

  ngOnInit(): void {}
}
