import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsServiceService } from 'src/app/Services/events-service.service';
import { UsersServiceService } from 'src/app/Services/users-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  User : any;
  UserSub : Subscription | undefined;
  show_Participate : Boolean = false;

  Participate : any;
  ParticipateSub : Subscription | undefined;

  private EventsSub : Subscription | undefined;
  public Events : any[] = [];

  constructor(private UserService:UsersServiceService,private ActiveRouter: ActivatedRoute,private ServiceEvent : EventsServiceService){}

  ngOnInit(): void {
    this.UserService.setLoggedUser(localStorage.getItem('id'));

    this.UserSub = this.UserService.Get_User_not_logged(this.ActiveRouter.snapshot.params['id']).subscribe((data:any) =>{
      this.User = data;
    },(error:any) => {
      console.error(error);
      
    });

    this.ParticipateSub = this.UserService.Get_Participation_For_User_not_Logged(this.ActiveRouter.snapshot.params['id']).subscribe((data:any) => {
      this.Participate = data;
      console.log(this.Participate)
    },(error:any) => {
      console.error(error);
      
    });

    this.EventsSub = this.ServiceEvent.Get_Events().subscribe(
      (events:any[]) =>{
        this.Events = events;
        console.log(events);
        
    },
    (error:any) => {
      console.error('Wystąpił błąd podczas pobierania eventow:', error);
    });
  }

  ngOnDestroy(): void {
    console.log("s")
    if (this.UserSub) {
      this.UserSub.unsubscribe();
    }
    if(this.ParticipateSub)
      this.ParticipateSub!.unsubscribe();
      if(this.EventsSub)
      this.EventsSub!.unsubscribe();
  }

  ShowParticipates(){
    this.show_Participate = !this.show_Participate;
  }

  isParticipating(eventId : number,array:any[]){
    for(let i =0;i<array.length;i++){
      if(eventId == array[i].event){
        return true;
      }
    }
    return false;
  }
}
