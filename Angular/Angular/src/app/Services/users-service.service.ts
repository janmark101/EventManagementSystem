import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  User_logged_id : any;

  private Url_Users = "http://127.0.0.1:8000/LoginSystem/"
  private Users :any [] = [];
  private UsersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.Users);

  private UserNotLogged :any [] = [];
  private UsersNotLoggedSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.UserNotLogged);

  private User : any[] = [];
  private UserSubject : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.User);

  private FollowsEventForUser = "http://127.0.0.1:8000/Events/FollowEventsList"
  private Follows :any [] = [];
  private FollowsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.Follows);

  private ParticipationURL = "http://127.0.0.1:8000/Events/ParticipantsList"
  private ParticipationList :any =[];
  private ParticipationSubject : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.ParticipationList);

  private ParticipationListnotLogged :any =[];
  private ParticipationnotLoggedSubject : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.ParticipationListnotLogged);

  private SavedEvents : any [] = [];
  private SavedEventsSubject : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.SavedEvents);


  constructor(private http:HttpClient) { }


  Get_users(): Observable<any[]>{
    this.http.get<any[]>(this.Url_Users + "UsersList.json").subscribe((data :any[]) => {
    this.UsersSubject.next(data);
    },
    (error :any) => {
      console.error(error);
    }
    );
    
    return this.UsersSubject.asObservable();
  }

  Get_User(): Observable<any[]>{
    this.http.get<any[]>(this.Url_Users + "User/" + this.User_logged_id +".json").subscribe((data:any[]) =>{
      this.UserSubject.next(data);
    },(error:any)=>{
      console.error(error);
    });
    return this.UserSubject.asObservable();
  }

  Get_User_not_logged(userId : any): Observable<any[]>{
    this.http.get<any[]>(this.Url_Users + "User/" + userId +".json").subscribe((data:any[]) =>{
      this.UsersNotLoggedSubject.next(data);
    },(error:any)=>{
      console.error(error);
    });
    return this.UsersNotLoggedSubject.asObservable();
  }

  setLoggedUser(User_id:any){
    this.User_logged_id = User_id;
  }

  Get_Following_events_For_User(){
    this.http.get<any[]>(this.FollowsEventForUser +"/"+ this.User_logged_id +".json").subscribe((data:any[]) =>{
      this.Follows = data;
      this.FollowsSubject.next(data);
    },(error:any)=>{
      console.error(error);
    });
    return this.FollowsSubject.asObservable();
  }

  Get_Participation_For_User(){
    this.http.get<any[]>(this.ParticipationURL+"/"+this.User_logged_id+".json").subscribe((data:any[])=>{
      this.ParticipationList = data;
      this.ParticipationSubject.next(data);
    },(error:any)=>{
      console.error(error);
      
    });
    return this.ParticipationSubject.asObservable();
  }

  Get_Participation_For_User_not_Logged(userId:number){
    this.http.get<any[]>(this.ParticipationURL+"/"+userId+".json").subscribe((data:any[])=>{
      this.ParticipationListnotLogged = data;
      this.ParticipationnotLoggedSubject.next(data);
    },(error:any)=>{
      console.error(error);
      
    });
    return this.ParticipationnotLoggedSubject.asObservable();
  }

  Get_saved_events() :Observable<any>{

    this.http.get<any[]>("http://127.0.0.1:8000/Events/SavedEvents/"+this.User_logged_id+".json").subscribe((data:any[])=>{
      this.SavedEvents = data;
      this.SavedEventsSubject.next(data);
    },(error:any)=>{
      console.error(error);
      
    })

    return this.SavedEventsSubject.asObservable();
  }



  FollowEvent(eventId : number){

    let Existing : Boolean = false;
    let object_id :any;


    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    const Follow = {
      "user" : this.User_logged_id,
      "event" : eventId
    }

    for ( let i=0;i<this.FollowsSubject.value.length;i++){
      if ((this.FollowsSubject.value[i].event === eventId) && (this.FollowsSubject.value[i].user == this.User_logged_id)){
        console.log("juz istnieje !")
        Existing = true;
        object_id = i;
        break;
      }
 
    }

    if(Existing === false)
    {
      this.Follows.push(Follow);
      this.FollowsSubject.next(this.Follows);
      return this.http.post<any>(this.FollowsEventForUser,Follow);
    }
    else
    { 
      this.Follows.splice(object_id,1);
      this.FollowsSubject.next(this.Follows);
      return this.http.delete<any>("http://127.0.0.1:8000/Events/FollowEventsList/"+this.User_logged_id+"/"+eventId); 
    }

    
  }

  ParticipateEvent(eventId:number){
    let Existing : Boolean = false;
    let object_id :any;


    const Participation = {
      "event" : eventId,
      "member" : this.User_logged_id
    }

    for ( let i=0;i<this.ParticipationSubject.value.length;i++){
      if ((this.ParticipationSubject.value[i].event === eventId) && (this.ParticipationSubject.value[i].member == this.User_logged_id)){
        console.log("juz istnieje !")
        Existing = true;
        object_id = i;
        break;
      }
 
    }

    if(Existing === false)
    {
      this.ParticipationList.push(Participation);
      this.ParticipationSubject.next(this.ParticipationList);
      return this.http.post<any>(this.ParticipationURL,Participation);
    }
    else
    { 
      this.ParticipationList.splice(object_id,1);
      this.ParticipationSubject.next(this.ParticipationList);
      return this.http.delete<any>("http://127.0.0.1:8000/Events/ParticipantsList/"+this.User_logged_id+"/"+eventId); 
    }
  }

  SaveEvent(eventId:number){
    let Existing : Boolean = false;
    let object_id :any;


    const Save = {
      "user" : this.User_logged_id,
      "event" : eventId
    }

    for ( let i=0;i<this.SavedEventsSubject.value.length;i++){
      if ((this.SavedEventsSubject.value[i].event === eventId) && (this.SavedEventsSubject.value[i].user == this.User_logged_id)){
        console.log("juz istnieje !")
        Existing = true;
        object_id = i;
        break;
      }
 
    }

    if(Existing === false)
    {
      this.SavedEvents.push(Save);
      this.SavedEventsSubject.next(this.SavedEvents);
      return this.http.post<any>("http://127.0.0.1:8000/Events/SavedEvents/"+this.User_logged_id,Save);
    }
    else
    { 
      this.SavedEvents.splice(object_id,1);
      this.SavedEventsSubject.next(this.SavedEvents);
      return this.http.delete<any>("http://127.0.0.1:8000/Events/SavedEvents/"+this.User_logged_id+"/"+eventId); 
    }
  }


}
