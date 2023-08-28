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

  Image : File | undefined ;
  title : string = '';

  constructor(private Service : EventsServiceService,private http:HttpClient){}

  OnSubmit(){
    
  //   const NewEvent = {
  //     "event_img": form.value.Image,
  //     "title": form.value.Title,
  //     "description":  form.value.Description,
  //     "location":  form.value.Location,
  //     "start_time": form.value.Start_time+":00Z",
  //     "end_time": form.value.End_time+":00Z",
  //     "max_participants":  form.value.Max_participants,
  //     "number_of_participants": 0,
  //     "city":  form.value.City,
  //     "normal_price": form.value.Normal_price,
  //     "reduced_price": form.value.Reduced_price,
  //     "reduce_ticket_info":  form.value.Reduce_ticket_information,
  //     "organizer": localStorage.getItem('id')
  // };

  // const formData = new FormData();
  // formData.append('event_img', form.value.Image);
  // formData.append('title',form.value.Title)

  if (!this.Image) return;
   const formData = new FormData();
    formData.append('event_img', this.Image);
    formData.append('title', this.title);

    const headers = new HttpHeaders({
      'Content-Disposition': 'multipart/form-data; filename=' + this.Image});

      this.http.post('http://127.0.0.1:8000/Events/EventsList', formData, { headers }).subscribe(
        (response) => {
          console.log('Upload successful', response);
        },
        (error) => {
          console.error('Error uploading', error);
        }
      );


    
  } 

  onFileSelected(event: any) {
    this.Image = event.target.files[0] as File;
  }
}
