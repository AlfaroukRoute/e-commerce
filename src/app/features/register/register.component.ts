import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // !!! form 

  registerForm = new FormGroup({
    name : new FormControl ( 'ahmed'  ,   [Validators.required ,Validators.minLength(7)] ),
    email : new FormControl(null ,[Validators.required , Validators.email]) ,
    password : new FormControl(null ) ,
    rePassword : new FormControl(null ) ,
    phone : new FormControl(null  ) ,
  });


  handleSubmit(){
    //  null
    console.log({nameErrors : this.registerForm.get('name')?.errors , emailErrors : this.registerForm.get('email')?.errors });
    
    console.log("register :-" , this.registerForm.value);
    
  }




}
