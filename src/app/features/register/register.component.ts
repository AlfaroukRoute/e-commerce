import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
@Component({
  selector: 'app-register',
  imports: [   ReactiveFormsModule  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

 
  // !!! reactive forms (FormGroup , FormControl , formArray , Validators , formBuilder , formControlName) ==> ReactiveFormsModule
 //! form in ts
 //! form UI 
 //! form tag ==> [formGroup] ==> registerForm
 //! input formControlName=""

//  !!! custom validation check rePassword

  registerForm : FormGroup = new FormGroup({
    name : new FormControl('' , [Validators.required , Validators.minLength(3) , Validators.maxLength(10) ]), 
    email : new FormControl('' , [Validators.required , Validators.email ]),
    phone : new FormControl('' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),




    password : new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword : new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)] ),

  });

//   
  handleSubmit(){


    // !!!
    if(this.registerForm.invalid){
    this.registerForm.markAllAsTouched();
      return;
    }
    // !!!!
    console.log(this.registerForm.value);
    // !!
  
    
  }


  get nameController(){
    return this.registerForm.get('name')
  }
  get emailController(){
    return this.registerForm.get('email')
  }
  get passwordController(){
    return this.registerForm.get('password')
  }
  get rePasswordController(){
    return this.registerForm.get('rePassword')
  }
  get phoneController(){
    return this.registerForm.get('phone')
  }



}
