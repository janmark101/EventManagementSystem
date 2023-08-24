import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { EventsServiceService } from 'src/app/Services/events-service.service';
import { UsersServiceService } from 'src/app/Services/users-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public IsLoggedIn : Boolean = false;

  constructor(private ServiceUser: UsersServiceService, private ServiceEvent:EventsServiceService,private AuthService : AuthServiceService){}

  private UsersSub : Subscription | undefined;
  public Users : any[] = [];

  private EventsSub : Subscription | undefined;
  public Events : any[] = [];

  private FollowsUserSub : Subscription | undefined;
  public FollowsUser : any[] = [];

  ngOnInit(): void {
    this.UsersSub = this.ServiceUser.Get_users().subscribe(
      (users: any[]) => {
        this.Users = users;
      },
      (error: any) => {
        console.error('Wystąpił błąd podczas pobierania użytkowników:', error);
      }
    );

    this.EventsSub = this.ServiceEvent.Get_Events().subscribe(
      (events:any[]) =>{
        this.Events = events;
    },
    (error:any) => {
      console.error('Wystąpił błąd podczas pobierania eventow:', error);
    }
    );

    
    this.IsLoggedIn = this.AuthService.getLogged();


    if (this.IsLoggedIn === true) {
    this.FollowsUserSub = this.ServiceUser.Get_Following_events_For_User().subscribe((data:any[])=>{
      this.FollowsUser = data;
      
    },(error:any) =>{
      console.error("blad", error);
    });
    }    
  

  }

  ngOnDestroy():void{
    this.UsersSub!.unsubscribe();
    this.EventsSub!.unsubscribe();
    if (this.FollowsUserSub)
      this.FollowsUserSub!.unsubscribe();
  }

  isMatch(eventid:number,tabela:any[]): Boolean {

    for (const follow of tabela){
      if (follow.event === eventid){
        return true
      }
    }

    return false
  }
  

  

  Like(){

  }
}
