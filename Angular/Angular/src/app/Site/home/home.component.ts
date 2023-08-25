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

  private ParticipationUserSub : Subscription | undefined;
  public Participations : any[] = [];

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

    this.ParticipationUserSub = this.ServiceUser.Get_Participation_For_User().subscribe((data:any[])=>{
      this.Participations = data;
      
    },(error:any) =>{
      console.error(error);
      
    });
    }    
  

  }

  ngOnDestroy():void{
    this.UsersSub!.unsubscribe();
    this.EventsSub!.unsubscribe();
    if (this.FollowsUserSub)
      this.FollowsUserSub!.unsubscribe();
    if(this.ParticipationUserSub)
      this.ParticipationUserSub!.unsubscribe();
  }

  // isMatch(eventId:number): Boolean {

  //   for(let i =0;i<this.FollowsUser.length;i++){
  //     if(eventId == this.FollowsUser[i].event){
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  
  isMatch(eventId:number,array:any[]): Boolean {

    for(let i =0;i<array.length;i++){
      if(eventId == array[i].event){
        return true;
      }
    }
    return false;
  }
  

  Like(eventId : number){

    this.ServiceUser.FollowEvent(eventId).subscribe ((response:any) =>{
      console.log(response);
    },(error:any)=>{
      console.error(error);
    });

  }

  Participate(eventId:number){
    this.ServiceUser.ParticipateEvent(eventId).subscribe ((response:any) =>{
      console.log(response);
    },(error:any)=>{
      console.error(error);
    });
  }
}
