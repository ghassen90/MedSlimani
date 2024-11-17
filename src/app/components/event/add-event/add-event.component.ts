import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../model/event.model';
 
import { EventResponseModel, UserCommentModel } from '../../model/event.model.response';
import { EventService } from 'src/app/service/event.service';
 
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  role: string | undefined;
  formEvent: any; 
  events: EventModel[] = []; // Declare the events array
  constructor(  private eventService :EventService, private formBuilder: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.formEvent = this.formBuilder.group({
      titre: '',
      description: '',
      
      //id_user:localStorage.getItem('idUser'),
      imageFile:null
    });
    if(localStorage.getItem('roles')){
      this.role = localStorage.getItem('roles')+"";
    }
  }
 
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formEvent.patchValue({
        imageFile: file
      });
      this.formEvent.get('imageFile')?.updateValueAndValidity();
    }
  }
 
  addEvent() { 
    if (this.formEvent) {
      const imageFile: File = this.formEvent.get('imageFile')?.value;
      const even: EventModel = this.formEvent.value;

      this.eventService.addEvent(even, imageFile).subscribe((value: any) => {
        if (value) {
          location.reload();
          //console.log('Event added:', value);
          // Optionally reset the form or navigate away
        }
      }, (error: HttpErrorResponse) => { // Specify the type for error
        console.error('Error adding event:', error.message); // Handle error appropriately
      });
    } else {
      console.error('Form is not initialized.');
    }
  }
  addEvente() {
    const imageFile: File = this.formEvent.get('imageFile')?.value;
    const event: EventModel = this.formEvent.value;
    this.eventService.addEvent(event, imageFile).subscribe(() => {
      // After successfully adding the event, fetch the updated list
      this.eventService.getListEvents().subscribe(events => {
        this.events = events; // Update the event list in your component
      }, error => {
        console.error('Error fetching events after adding:', error);
      });
    }, error => {
      console.error('Error adding event:', error);
    });
  }
  
}
