import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersServiceService } from 'src/app/Services/users-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  message : any;
  constructor(private Service:UsersServiceService){}

  OnSubmit(form : NgForm){
    console.log(form.value);
    const User = {
      "email": form.value.email,
      "password": form.value.password
    };
    this.Service.LoginUser(User).subscribe((response:any)=>{ 
        this.message = response;
        console.log(response);
      },
        
        (error:any)=>{
          this.message = error;
          console.log(error);
      });
  }
}
