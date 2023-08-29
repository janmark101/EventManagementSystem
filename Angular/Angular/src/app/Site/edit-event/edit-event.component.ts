import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EventsServiceService } from 'src/app/Services/events-service.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  Event : any;
  EventSub : Subscription | undefined
  
  title: string |undefined;
  description : string |undefined;
  location : string |undefined;
  start_time : string |undefined;
  end_time : string |undefined;
  city : string |undefined;
  normal_price : string |undefined;
  reduced_price : string |undefined;
  reduce_price_info : string |undefined;
  max_participants : string | undefined;
  image: File |undefined;

  message :any;
  color : any;

  ngOnInit(): void {
    this.EventSub = this.EventService.Get_Event(this.data.EventId).subscribe((data:any) => {
      this.Event = data;
      this.title = this.Event.title;
      this.description = this.Event.description;
      this.location = this.Event.location;
      this.start_time = this.Event.start_time.slice(0,16);
      this.end_time = this.Event.end_time.slice(0,16);
      this.city = this.Event.city;
      this.normal_price = this.Event.normal_price;
      this.reduced_price = this.Event.reduced_price;
      this.reduce_price_info = this.Event.reduce_ticket_info;
      this.max_participants = this.Event.max_participants;

      
    },(error:any)=>{
      console.error(error);
      
    })

  }

  ngOnDestroy(){
    if (this.EventSub)
      this.EventSub!.unsubscribe();
  }

  onImageChanged(event: any) {
    this.image = event.target.files[0];
  }

  constructor(
    private dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private EventService : EventsServiceService,private http : HttpClient
  ) {}

  onConfirm() {
    const uploadData = new FormData();
    if (this.image! == undefined){
      uploadData.append('title', this.title!);
      uploadData.append('description', this.description!);
      uploadData.append('location', this.location!);
      uploadData.append('start_time', this.start_time!+":00Z");
      uploadData.append('end_time', this.end_time!+":00Z");
      uploadData.append('city', this.city!);
      uploadData.append('normal_price', this.normal_price!);
      uploadData.append('reduced_price', this.reduced_price!);
      uploadData.append('reduce_ticket_info', this.reduce_price_info!);
      uploadData.append('organizer', localStorage.getItem('id')!);
      uploadData.append('max_participants', this.max_participants!);
    } 
    else{
      uploadData.append('title', this.title!);
      uploadData.append('description', this.description!);
      uploadData.append('location', this.location!);
      uploadData.append('start_time', this.start_time!+":00Z");
      uploadData.append('end_time', this.end_time!+":00Z");
      uploadData.append('city', this.city!);
      uploadData.append('normal_price', this.normal_price!);
      uploadData.append('reduced_price', this.reduced_price!);
      uploadData.append('reduce_ticket_info', this.reduce_price_info!);
      uploadData.append('organizer', localStorage.getItem('id')!);
      uploadData.append('max_participants', this.max_participants!);
      uploadData.append('event_img', this.image!,this.image!.name);
      
    }

    
    this.http.patch('http://127.0.0.1:8000/Events/EventUpdate/'+this.data.EventId, uploadData).subscribe((data:any)=>{
      console.log(data);
    },(error:any) =>{
      console.error(error);
      
    });

    
    this.dialogRef.close();
    }
  

  onCancel() {
    this.dialogRef.close('cancel');
  }
}
