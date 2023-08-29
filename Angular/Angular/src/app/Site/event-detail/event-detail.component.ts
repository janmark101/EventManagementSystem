import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsServiceService } from 'src/app/Services/events-service.service';
import { UsersServiceService } from 'src/app/Services/users-service.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit{

  constructor(private EventService : EventsServiceService,private route :ActivatedRoute,private ServiceUser : UsersServiceService) {}

  Event : any ;
  EventSubscribtion : Subscription | undefined;

  SumParticipants : number |undefined;

  private ParticipationUserSub : Subscription | undefined;
  public Participations : any[] = [];

  private EventParticipationSub : Subscription | undefined;
  public EventParticipations : any[] = [];

  private SavedSub : Subscription | undefined;
  public Saved : any[] = [];

  isLoggedIn : Boolean = false;

  ngOnInit(): void {
    const user_id = localStorage.getItem('id')
    this.EventParticipationSub = this.ServiceUser.Get_Participations_For_Event(this.route.snapshot.params['id']).subscribe((data:any[])=>{
      this.EventParticipations = data;
      this.SumParticipants = this.EventParticipations.length;
      console.log(data);
    });


    if (user_id === null) 
    {
      this.isLoggedIn=false
  
    } 
    else {
      this.isLoggedIn=true
      this.ServiceUser.setLoggedUser(localStorage.getItem('id'));
      this.ParticipationUserSub = this.ServiceUser.Get_Participation_For_User().subscribe((data:any[])=>{
        this.Participations = data;
      });
      this.SavedSub = this.ServiceUser.Get_saved_events().subscribe((data:any[])=>{
        this.Saved = data;
      });
    }

    this.EventSubscribtion = this.EventService.Get_Event(this.route.snapshot.params['id']).subscribe((data:any) => {
      this.Event = data;
    },
    (error: any) => {
      console.error('Wystąpił błąd podczas pobierania użytkowników:', error);
    }
    );


  }

  ngOnDestroy():void{
    this.EventSubscribtion!.unsubscribe();
    if (this.ParticipationUserSub)
      this.ParticipationUserSub!.unsubscribe();
    if (this.SavedSub)
      this.SavedSub!.unsubscribe();
    if (this.EventParticipationSub)
      this.EventParticipationSub!.unsubscribe();
  }

  isMatch(eventId:number,array:any[]): Boolean {

    for(let i =0;i<array.length;i++){
      if(eventId == array[i].event){
        return true;
      }
    }
    return false;
  }

  Participate(eventId:number){
    this.ServiceUser.ParticipateEvent(eventId).subscribe ((response:any) =>{
      this.EventParticipationSub=this.ServiceUser.Get_Participations_For_Event(this.route.snapshot.params['id']).subscribe((data:any[])=>{
        this.EventParticipations = data;
        this.SumParticipants = this.EventParticipations.length;
        console.log(data);
      });    
    },(error:any)=>{
      console.error(error);
    });
      this.EventParticipationSub?.unsubscribe();
  }

  Save(eventId:number){
    this.ServiceUser.SaveEvent(eventId).subscribe ((response:any) =>{
      console.log(response);
    },(error:any)=>{
      console.error(error);
    });
  }


}
