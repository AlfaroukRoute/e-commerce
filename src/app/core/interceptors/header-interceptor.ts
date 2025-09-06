import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const cookies = inject(CookieService);
  const token = cookies.get('token');//! "" localStorage.getItem('token')

  if (token) {
    req = req.clone({
      setHeaders: {
        token: token || '',
      },
    });
  }

  return next(req);
};
