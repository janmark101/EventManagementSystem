import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersServiceService } from 'src/app/Services/users-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  User : any;
  UserSub : Subscription | undefined;

  constructor(private UserService:UsersServiceService,private ActiveRouter: ActivatedRoute){}

  ngOnInit(): void {
    this.UserService.setLoggedUser(this.ActiveRouter.snapshot.params['id']);

    this.UserSub = this.UserService.Get_User().subscribe((data:any) =>{
      this.User = data;
    },(error:any) => {
      console.error(error);
      
    });
  }
}
