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

  constructor(private Service : EventsServiceService){}

  OnSubmit(form : NgForm){
    const NewEvent = {
      "event_img": form.value.Image,
      "title": form.value.Title,
      "description":  form.value.Description,
      "location":  form.value.Location,
      "start_time": form.value.Start_time+":00Z",
      "end_time": form.value.End_time+":00Z",
      "max_participants":  form.value.Max_participants,
      "number_of_participants": 0,
      "city":  form.value.City,
      "normal_price": form.value.Normal_price,
      "reduced_price": form.value.Reduced_price,
      "reduce_ticket_info":  form.value.Reduce_ticket_information,
      "organizer": 4
  };
    console.log(NewEvent);
  this.Service.Create_Event(NewEvent).subscribe((response :any) => {
      
      this.Message = "Created new event!";
      this.Color = "green";
      this.InputForm!.resetForm();
    },
    (error :any) => {
      console.error('Error:', error.error);
      this.Message = "Adding new event failed";
      this.Color = "red";
    });
  }
}
