import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { catchError, filter, map, mergeMap, retry, throwError , finalize } from 'rxjs';





// ! rx JS operators(functions)

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  console.log("start loader");
  
  loader.show();

  return next(req).pipe(
    finalize(()=>{
        loader.hide();
    })
  );
};
