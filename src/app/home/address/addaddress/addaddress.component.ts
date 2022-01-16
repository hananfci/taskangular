import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
 import { BsModalRef } from 'ngx-bootstrap/modal'; 
import { IAddAddress } from '../AddressService/Address.model';
import { AddressService } from '../AddressService/address.service';
import { IPerson } from '../../person/personService/person.model';
import { PersonService } from '../../person/personService/person.service';
@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.css']
})
export class AddaddressComponent implements OnInit {

  Addressform:FormGroup;
  persons: IPerson[];
  postdata :boolean= false;
  Address:IAddAddress;
  public event: EventEmitter<any> = new EventEmitter();
  personId :number;
  constructor(private AddressServ:AddressService, public bsModalRef: BsModalRef,private personServ:PersonService)  { }
 
  ngOnInit(): void {
     this.Addressform=new FormGroup({
      AddressName : new FormControl(null,Validators.required),
    }); 
    this.personList();
  }
  personList() {
  
    this.personServ.getPersonsList()
      .subscribe(
        response => {
          const jsonValue = JSON.stringify(response);
          const valueFromJson = JSON.parse(jsonValue);
          this.persons = ((valueFromJson || {})); 
        },
        error => {
          
        });
  }
  onPost(){
    this.postdata = true;
    
    this.Address={
        streetName: this.Addressform.value.AddressName ,
        personId:this.personId
      };
    this.AddressServ.onPost( this.Address).subscribe( data => { 
      this.postdata = false;
      this.saveToList();
      this.Addressform.reset();
    } );    
    
  }

  
  saveToList() {
   this.triggerEvent();
   this.bsModalRef.hide();
  }

  triggerEvent() {
    this.event.emit({ data: "this.Addressloyeedata" , res:200  });
  } 
}