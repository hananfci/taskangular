import { NgModule  } from '@angular/core';
import { HomeRoutingModule } from './home-routing-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination';

import { PersonComponent } from './person/person.component';
import { AddressComponent } from './address/address.component';
import { IndexpersonComponent } from './person/indexperson/indexperson.component';
import { IndexaddressComponent } from './address/indexaddress/indexaddress.component';
import { AddpersonComponent } from './person/addperson/addperson.component';
import { AddaddressComponent } from './address/addaddress/addaddress.component';
import { EditaddressComponent } from './address/editaddress/editaddress.component';
import { EditpersonComponent } from './person/editperson/editperson.component';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,   
    NgxPaginationModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],

  declarations: [
  PersonComponent,
  AddressComponent,
  IndexpersonComponent,
  IndexaddressComponent,
  AddpersonComponent,
  AddaddressComponent,
  EditaddressComponent,
  EditpersonComponent],

  providers: [

  ],
})
export class HomeModule { }
