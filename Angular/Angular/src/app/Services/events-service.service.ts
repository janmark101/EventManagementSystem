import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  private Url_Events = "http://127.0.0.1:8000/Events/"
  private Events :any [] = [];
  private EventsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.Events);

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
}
