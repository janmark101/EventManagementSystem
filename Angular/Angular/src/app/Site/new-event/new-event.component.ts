import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventsServiceService } from 'src/app/Services/events-service.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent {

  @ViewChild('form') InputForm : NgForm | undefined;
  Message : any;
  Color : any;



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

  constructor(private http: HttpClient) {}

  onImageChanged(event: any) {
    this.image = event.target.files[0];
  }


    OnSubmit(){
      if (this.image! == undefined){
        this.Color = 'red';
        this.Message = "Adding new event failed!";
        return;
      } 
      else{
      const uploadData = new FormData();
      uploadData.append('title', this.title!);
      uploadData.append('description', this.description!);
      uploadData.append('event_img', this.image!, this.image!.name);
      uploadData.append('location', this.location!);
      uploadData.append('start_time', this.start_time!+":00Z");
      uploadData.append('end_time', this.end_time!+":00Z");
      uploadData.append('city', this.city!);
      uploadData.append('normal_price', this.normal_price!);
      uploadData.append('reduced_price', this.reduced_price!);
      if (this.reduce_price_info != undefined) {uploadData.append('reduce_ticket_info', this.reduce_price_info!);}
      uploadData.append('organizer', localStorage.getItem('id')!);
      uploadData.append('max_participants', this.max_participants!);
  
          this.http.post('http://127.0.0.1:8000/Events/CreateEvent', uploadData).subscribe((data:any)=>{
            console.log(data);
            this.Color = 'green';
            this.Message = 'Succesfully added new event!'
          },(error:any) =>{
            this.Color = 'red';
            this.Message = "Adding new event failed!";
            console.error(error);
            
          });
    }
  }
  
}
