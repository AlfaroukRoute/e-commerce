import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

// 
export const routes: Routes = [

    {path : "" , redirectTo : "home" , pathMatch :"full"},

    {path : "home" , canActivate: [authGuard] ,loadComponent : () => import('./features/home/home.component').then(m => m.HomeComponent)} ,
    {path : "products" , canActivate: [authGuard] ,loadComponent : () => import('./features/products/products.component').then(m => m.ProductsComponent)} ,
    {path : "categories" , canActivate: [authGuard] ,loadComponent : () => import('./features/categories/categories.component').then(m => m.CategoriesComponent)} ,
    {path : "brands" , canActivate: [authGuard] ,loadComponent : () => import('./features/brands/brands.component').then(m => m.BrandsComponent)} ,
    {path : "cart" , canActivate: [authGuard] ,loadComponent : () => import('./features/cart/cart.component').then(m => m.CartComponent)} ,
    {path : "product-details/:id/:hamada" , canActivate: [authGuard] ,loadComponent : () => import('./features/product-details/product-details.component').then(m => m.ProductDetailsComponent)} ,



    {path : "forget-password" ,loadComponent : () => import('./features/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)} ,
    {path : "login" ,loadComponent : () => import('./features/login/login.component').then(m => m.LoginComponent)} ,
    {path : "register" ,loadComponent : () => import('./features/register/register.component').then(m => m.RegisterComponent)} ,


    {path : "**" ,loadComponent : () => import('./features/notfound/notfound.component').then(m => m.NotfoundComponent)}
];
