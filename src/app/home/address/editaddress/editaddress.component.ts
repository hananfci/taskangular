import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
 import { BsModalRef } from 'ngx-bootstrap/modal'; 
import { IAddAddress } from '../AddressService/Address.model';
import { AddressService } from '../AddressService/address.service';
import { IPerson } from '../../person/personService/person.model';
import { PersonService } from '../../person/personService/person.service';
@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['./editaddress.component.css']
})
export class EditaddressComponent implements OnInit {
  list: any[] = []
  Addressform:FormGroup;
  persons: IPerson[];
  postdata :boolean= false;
  Address:IAddAddress;
  public event: EventEmitter<any> = new EventEmitter();
  personId :number;
  address:any;
  constructor(private AddressServ:AddressService, public bsModalRef: BsModalRef,private personServ:PersonService)  { }
 
  ngOnInit(): void {
     this.Addressform=new FormGroup({
      AddressName : new FormControl(null,Validators.required),
    }); 
    this.personList();
    this.GetAddress(+(this.list[0].value));
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
  GetAddress(id:number)
  {
    ;
    this.AddressServ.onGetAddress(id).subscribe((res) => {
      const jsonValue = JSON.stringify(res);
      const valueFromJson = JSON.parse(jsonValue);
      this.address = ((valueFromJson || {}));
      this.Addressform.patchValue({
        AddressName:this.address.streetName,
      }); 
   
      this.personId = this.address.personId;
    });      
  } 
  onPost(){
    ;
    this.postdata = true;
    this.address={
      streetName: this.Addressform.value.AddressName ,
      personId: this.personId,
    };
      this.AddressServ.onPut(+(this.list[0].value),this.address).subscribe( data => { 
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
      this.event.emit({ data:  this.address , res:200  });
    } 
}
