import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsServiceService } from 'src/app/Services/events-service.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit{

  constructor(private EventService : EventsServiceService,private route :ActivatedRoute) {}

  Event : any ;
  EventSubscribtion : Subscription | undefined;

  ngOnInit(): void {
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
  }
}
