import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersServiceService } from 'src/app/Services/users-service.service';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private Userservice : UsersServiceService,private authService : AuthServiceService,private router:Router,private http:HttpClient){}


  isLoggedIn : Boolean = false;
  User : any ='';
  UserSubscritpion : Subscription |undefined;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token === null) {this.isLoggedIn=false} else {
      this.isLoggedIn=true
      this.Userservice.setLoggedUser(localStorage.getItem('id'));
      this.authService.setLogged(true);
      this.UserSubscritpion = this.Userservice.Get_User().subscribe((data:any[]) => {
        this.User = data;
      },(error:any)=>{
        console.error(error);
      });
    };
  }
  
  ngOnDestroy(): void {
    if (this.UserSubscritpion) {
      this.UserSubscritpion.unsubscribe();
    }
  }

  logout(){
    this.authService.logout().subscribe(
      response => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('id'); // Usunięcie tokena z pamięci przeglądarki
        this.authService.setLogged(false);
        //this.LoggedOut();

      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }

  LoggedOut(){
    this.router.navigate(['']).then(()=>{
      window.location.reload()
    })
  }
}
