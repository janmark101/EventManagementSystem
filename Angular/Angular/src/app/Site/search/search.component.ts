import { Component,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsServiceService } from 'src/app/Services/events-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  constructor(private ServiceEvent : EventsServiceService){}

  private EventSub : Subscription | undefined;
  public Events :any[] = [];

  ngOnInit(): void {
    this.EventSub = this.ServiceEvent.Get_Events().subscribe((events:any[]) => {
      this.Events = events;
    },
    (error:any) => {
      console.error(error);
    }
    );
  }

  ngOnDestroy(): void {
    this.EventSub!.unsubscribe();
    
  }
}
