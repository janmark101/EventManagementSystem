import { Component,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsServiceService } from 'src/app/Services/events-service.service';
import { SearchPipePipe } from 'src/app/Services/search-pipe.pipe';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers : [SearchPipePipe]
})
export class SearchComponent implements OnInit{

  constructor(private ServiceEvent : EventsServiceService, private FilterPipe : SearchPipePipe){}

  private EventSub : Subscription | undefined;
  public Events :any[] = [];
  FilteredTitle : string = "";
  FilteredEvents : any[] = []

  ngOnInit(): void {
    this.EventSub = this.ServiceEvent.Get_Events().subscribe((events:any[]) => {
      this.Events = events;
      this.FilteredEvents = events;
    },
    (error:any) => {
      console.error(error);
    }
    );
  }

  ngOnDestroy(): void {
    this.EventSub!.unsubscribe();
    
  }

  SearchTitles(){
    this.FilteredEvents = this.FilterPipe.transform(this.Events,this.FilteredTitle);
  }

  onTextChanged(){
    this.FilteredEvents = this.FilterPipe.transform(this.Events,this.FilteredTitle);
  }
}
