import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { UsersServiceService } from 'src/app/Services/users-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  message_color = 'black'
  email = '';
  password = '';
  message = '';
  form : NgForm | undefined;
  constructor(private authService: AuthServiceService, private router : Router,private UserService: UsersServiceService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.id);
        this.UserService.setLoggedUser(response.id);
        this.Logged();
      },
      error => {
        this.message_color = 'red';
        this.form?.reset();
        this.message = error.error['error'];
      }
    );
  }

  OnSubmit(form : NgForm){
    let User = {
      "email" : form.value.email,
      "password" : form.value.password,
      "firstname" : form.value.Firstname,
      "lastname" : form.value.Lastname
    }

    this.authService.register(User).subscribe(()=>{
      form.reset();
      this.message_color = 'green';
      this.form?.reset();
      this.message = "Succesfully registered!"
    },error=>{
      console.log(error);
        this.message = 'Something went wrong..!'
      this.message_color = 'red';

      
    })


 }

 Logged(){
  this.router.navigate(['']).then(() => {
    window.location.reload();
});
 }
}
