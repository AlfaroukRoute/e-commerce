import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService, UserData, UserDataLogin } from '../../core/services/auth.service';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
isLoading = false;
authService = inject(AuthService)
toastr = inject(ToastrService)
router = inject(Router);
cookies = inject(CookieService);



  loginForm: FormGroup = new FormGroup(
    {
   
      email: new FormControl('', [Validators.required, Validators.email]),
    
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z@0-9]{5,10}$/),
      ]),
    },
  
  );


  login(value: UserDataLogin) {
    this.isLoading = true;
    this.authService.login(value).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('login successful:', response);
        // !!!!!! token
        this.cookies.set('token', response.token);
        this.authService.decodedToken(response.token);

        this.toastr.success("login successful" , "Success" ) 
        // !!! /home
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('login failed:', error);
        if(error?.error?.message){
          this.toastr.error(error.error.message , "Error" )
        }
      },
    });
  }

  //
  handleSubmit() {
    // !!!
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const values = this.loginForm.value;
    this.login(values);
  }




  get emailController() {
    return this.loginForm.get('email');
  }
  get passwordController() {
    return this.loginForm.get('password');
  }
 
}
