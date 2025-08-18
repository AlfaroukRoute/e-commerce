import { RenderMode, ServerRoute } from '@angular/ssr';


// !! page ==> csr , ssr , 
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
