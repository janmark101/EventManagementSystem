import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  private Url_Events = "http://127.0.0.1:8000/Events/"
  private Events :any [] = [];
  private EventsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.Events);

  private Event :any[] =[];
  private EventSub: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.Event);

  constructor(private http:HttpClient) { }


  Get_Events(): Observable<any[]>{
    this.http.get<any[]>(this.Url_Events + "EventsList.json").subscribe((data :any[]) => {
    this.EventsSubject.next(data);
    },
    (error :any) => {
      console.error(error);
    }
    );
    
    return this.EventsSubject.asObservable();
  }

  Get_Event(id_event:number): Observable<any>{
    
    this.http.get<any>(this.Url_Events+"Event/"+id_event).subscribe((data:any) =>{
      this.EventSub.next(data);
    },
    (error :any) => {
      console.error(error);
    });
    return this.EventSub.asObservable();
  }

  Create_Event(event : any): Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.Url_Events + "EventsList", event, { headers })

  }


}
