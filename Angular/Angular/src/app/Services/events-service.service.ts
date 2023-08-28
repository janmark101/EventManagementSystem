import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
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

  private FollowsUrl = "http://127.0.0.1:8000/Events/FollowEventsList"
  private AllFollows :any [] = [];
  private AllFollowsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.AllFollows);

  private Sum : any [] = [];
  private SumSubject : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.Sum);



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

  Create_Event(event : FormData,header : HttpHeaders): Observable<any>{

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    const headers = new HttpHeaders();
headers.append('enctype', 'multipart/form-data');

    return this.http.post<any>(this.Url_Events + "EventsList", event)

  }

  Get_All_Follows(){
    this.http.get<any[]>(this.FollowsUrl+".json").subscribe((data:any[])=>{
      this.AllFollows = data;
      this.AllFollowsSubject.next(data);
    },(error:any)=>{
      console.error(error);
      
    });
    return this.AllFollowsSubject.asObservable();
  }


  Get_Event_Follows(id_event:number): Observable<any>{
    
    this.http.get<any>("http://127.0.0.1:8000/Events/FollowListForEvent/"+id_event).subscribe((data:any) =>{
      this.SumSubject.next(data);
    },
    (error :any) => {
      console.error(error);
    });
    return this.SumSubject.asObservable();
  }

 
 
 

}
