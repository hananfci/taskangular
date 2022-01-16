import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
 import { BsModalRef } from 'ngx-bootstrap/modal'; 
import { PersonService } from '../personService/person.service';
import { IPerson } from '../personService/person.model';
@Component({
  selector: 'app-addperson',
  templateUrl: './addperson.component.html',
  styleUrls: ['./addperson.component.css']
})
export class AddpersonComponent implements OnInit {

  personform:FormGroup;
  postdata :boolean= false;
  person:IPerson;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(private personServ:PersonService, public bsModalRef: BsModalRef)  { }
 
  ngOnInit(): void {
     this.personform=new FormGroup({
      personName : new FormControl(null,Validators.required),
      personEmail : new FormControl(null,[Validators.required,Validators.email]),
      personPhone : new FormControl(null,[Validators.required]),
    }); 
    
  }
  
  onPost(){
    this.postdata = true;
    
    this.person={
        name: this.personform.value.personName ,
        email: this.personform.value.personEmail,
        phone:(this.personform.value.personPhone).toString()
      };
    this.personServ.onPost( this.person).subscribe( data => { 
      this.postdata = false;
      this.saveToList();
      this.personform.reset();
    } );    
    
  }

  
  saveToList() {
   this.triggerEvent();
   this.bsModalRef.hide();
  }

  triggerEvent() {
    this.event.emit({ data: "this.personloyee" , res:200  });
  } 
}