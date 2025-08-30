import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, UserData } from '../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // !!! reactive forms (FormGroup , FormControl , formArray , Validators , formBuilder , formControlName) ==> ReactiveFormsModule
  //! form in ts
  //! form UI
  //! form tag ==> [formGroup] ==> registerForm
  //! input formControlName=""

  //  !!! custom validation check rePassword
  isLoading = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        // Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/),
      ]),
      rePassword: new FormControl('', []),
    },
    { validators: this.matchPasswordValidation }
  );

  constructor(private authService: AuthService , private toastr: ToastrService , private router: Router) {}

  register(value: UserData) {
    this.isLoading = true;
    this.authService.register(value).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Registration successful:', response);
        // !!!!!! token
        localStorage.setItem('token', response.token);
        this.authService.decodedToken(response.token);
        this.toastr.success("Registration successful" , "Success" ) 
        // !!! /home
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration failed:', error);
        if(error?.error?.message){
          this.toastr.error(error.error.message , "Error" )
        }
      },
    });
  }

  //
  handleSubmit() {
    // !!!
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const values = this.registerForm.value;
    this.register(values);
  }

  matchPasswordValidation(group: AbstractControl): null | Record<string, any> {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword
      ? null
      : {
          noMatch: {
            passwordValue: password,
            rePasswordValue: rePassword,
          },
        };
  }

  get nameController() {
    return this.registerForm.get('name');
  }
  get emailController() {
    return this.registerForm.get('email');
  }
  get passwordController() {
    return this.registerForm.get('password');
  }
  get rePasswordController() {
    return this.registerForm.get('rePassword');
  }
  get phoneController() {
    return this.registerForm.get('phone');
  }
}
