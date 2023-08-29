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

  constructor(private ServiceUser: UsersServiceService, private ServiceEvent:EventsServiceService,private AuthService : AuthServiceService,private Userservice : UsersServiceService){}

  private UsersSub : Subscription | undefined;
  public Users : any[] = [];

  private EventsSub : Subscription | undefined;
  public Events : any[] = [];

  private FollowsUserSub : Subscription | undefined;
  public FollowsUser : any[] = [];

  private ParticipationUserSub : Subscription | undefined;
  public Participations : any[] = [];

  private AllFollowsSub : Subscription | undefined;
  public AllFollows : any[] = [];

  private counFollowSub : Subscription | undefined;
  public Sum : any = 0;


  OrganizerIndex :any;

  ngOnInit(): void {
    const user_id = localStorage.getItem('id');
    if (user_id === null) {this.IsLoggedIn=false} else {
      this.IsLoggedIn=true
      this.Userservice.setLoggedUser(localStorage.getItem('id'));
    }
    

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

    this.FollowsUserSub = this.ServiceEvent.Get_All_Follows().subscribe((data:any[])=>{
      this.AllFollows = data;
    },(error:any)=>{
      console.error(error);
      
    });
    

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
    if(this.UsersSub)
      this.UsersSub!.unsubscribe();
    if(this.EventsSub)
      this.EventsSub!.unsubscribe();
    if(this.AllFollowsSub)
      this.AllFollowsSub!.unsubscribe();
    if (this.FollowsUserSub)
      this.FollowsUserSub!.unsubscribe();
    if(this.ParticipationUserSub)
      this.ParticipationUserSub!.unsubscribe();
    if(this.AllFollowsSub)
      this.AllFollowsSub!.unsubscribe();
    if(this.counFollowSub)
      this.counFollowSub!.unsubscribe();
  }

  findOrganizer(userId:number){
    
    for(let i =0;i<this.Users.length;i++){
      
      if(userId == this.Users[i].id){
        this.OrganizerIndex = i;       
        return this.Users[i].firstname + " " +this.Users[i].lastname;
      }
    }
    return null;
  }

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
      this.FollowsUserSub = this.ServiceEvent.Get_All_Follows().subscribe((data:any[])=>{
        this.AllFollows = data;
      });
    },(error:any)=>{
      console.error(error);
    });
      this.FollowsUserSub?.unsubscribe();
  }

  Participate(eventId:number){
    this.ServiceUser.ParticipateEvent(eventId).subscribe ((response:any) =>{
      console.log(response);
    },(error:any)=>{
      console.error(error);
    });
  }

  countFollows(eventId:number){
    let sum :number = 0;
    for(let i =0;i<this.AllFollows.length;i++){
      if(eventId == this.AllFollows[i].event){
        sum++;
      }
    }
    return sum ;
  }


}
