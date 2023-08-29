import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { UsersServiceService } from 'src/app/Services/users-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

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
    this.form = form;
    this.email = form.value.email;
    this.password = form.value.password;
    console.log(this.email,this.password);
    this.login();

 }

 Logged(){
  this.router.navigate(['']).then(() => {
    window.location.reload();
});
 }

}
