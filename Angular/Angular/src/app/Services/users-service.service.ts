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

  private User : any[] = [];
  private UserSubject : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.User);

  private FollowsEventForUser = "http://127.0.0.1:8000/Events/FollowEventsList"
  private Follows :any [] = [];
  private FollowsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.Follows);

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

  setLoggedUser(User_id:any){
    this.User_logged_id = User_id;
  }

  Get_Following_events_For_User(){
    this.http.get<any[]>(this.FollowsEventForUser +"/"+ this.User_logged_id +".json").subscribe((data:any[]) =>{
      this.FollowsSubject.next(data);
    },(error:any)=>{
      console.error(error);
    });
    return this.FollowsSubject.asObservable();
  }

  FollowEvent(eventId : number){

    let Existing : Boolean = false;

    const UserId_Int = parseInt(this.User_logged_id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const Follow = {
      "user" : this.User_logged_id,
      "event" : eventId
    }

    for ( let i=0;i<this.FollowsSubject.value.length;i++){
      if ((this.FollowsSubject.value[i].event === eventId) && (this.FollowsSubject.value[i].user == this.User_logged_id)){
        console.log("juz istnieje !")
        Existing = true;
        break;
      }
 
    }

    if(Existing === false)
    {return this.http.post<any>(this.FollowsEventForUser,Follow)}
    else { return this.http.delete<any>("http://127.0.0.1:8000/Events/FollowEventsList/"+this.User_logged_id+"/"+eventId); }

    
  }

}
