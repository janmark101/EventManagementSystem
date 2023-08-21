import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsServiceService } from 'src/app/Services/events-service.service';
import { UsersServiceService } from 'src/app/Services/users-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private ServiceUser: UsersServiceService, private ServiceEvent:EventsServiceService){}

  private UsersSub : Subscription | undefined;
  public Users : any[] = [];

  private EventsSub : Subscription | undefined;
  public Events : any[] = [];

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
    
  }

  ngOnDestroy():void{
    this.UsersSub!.unsubscribe();
    this.EventsSub!.unsubscribe();
  }
}
