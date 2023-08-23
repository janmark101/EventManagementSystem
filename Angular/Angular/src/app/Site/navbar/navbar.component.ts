import { Component } from '@angular/core';
import { UsersServiceService } from 'src/app/Services/users-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private service : UsersServiceService){}

  logout(){
    this.service.LogoutUser().subscribe((response:any) =>{
      console.log(response);
    },(error:any)=>{
      console.log(error);
    });
  }

  cookies(){
    const sessionid = this.getCookie('sessionid');
if (sessionid) {
  console.log("zalogowany")
} else {
  console.log("nie zalogowany")
}
  }
  

getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift()!;
  return '';
}
}
