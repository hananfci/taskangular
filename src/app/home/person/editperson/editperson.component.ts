import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
 import { BsModalRef } from 'ngx-bootstrap/modal'; 
import { PersonService } from '../personService/person.service';
import { IPerson } from '../personService/person.model';

@Component({
  selector: 'app-editperson',
  templateUrl: './editperson.component.html',
  styleUrls: ['./editperson.component.css']
})
export class EditpersonComponent implements OnInit {

  personform:FormGroup;
  postdata :boolean= false;
  person:any;
  list: any[] = []
  public event: EventEmitter<any> = new EventEmitter();

  constructor(private personServ:PersonService, public bsModalRef: BsModalRef)  { }
 
  ngOnInit(): void {
     this.personform=new FormGroup({
      personName : new FormControl(null,Validators.required),
      personEmail : new FormControl(null,[Validators.required,Validators.email]),
      personPhone : new FormControl(null,[Validators.required]),
    }); 
    this.onGetPerson(+(this.list[0].value))
    
  }
  
 
  onGetPerson(id:number)
  {
    ;
    this.personServ.onGetPerson(id).subscribe((res) => {
      const jsonValue = JSON.stringify(res);
      const valueFromJson = JSON.parse(jsonValue);
      this.person = ((valueFromJson || {}));
      this.personform.patchValue({
        personName:this.person.name,
        personEmail:this.person.email,
        personPhone:this.person.phone,
      }); 
   
    });      
  } 
  onPost(){
    this.postdata = true;
    this.person={
         id:+(this.list[0].value),
         name: this.personform.value.personName ,
         email: this.personform.value.personEmail,
         phone:(this.personform.value.personPhone).toString()
    };
      this.personServ.onPut(+(this.list[0].value),this.person).subscribe( data => { 
        this.postdata = false;
        this.saveToList();
      } ,  (error) => 
      {  
        this.postdata = false;
      });
  }
  
  saveToList() {
   this.triggerEvent();
   this.bsModalRef.hide();
  }

  
   triggerEvent() {
     this.event.emit({ data:  this.person , res:200  });
   }  
}
