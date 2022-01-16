import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddAddress, IAddress } from './address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

    
    apiRoot=environment.apiRoot;
    constructor(private http:HttpClient) { }
   
    getAddressesList():Observable<any>
    {
      return this.http.get(`${this.apiRoot}/Address/Getall`);
    }
    onGetAddress(id:number){
      
      return this.http.get(`${this.apiRoot}/Address/DetailsAddress?id=${id}`);  
    } 
    onDelete(id: number){
     ;
      return this.http.delete(`${this.apiRoot}/Address/DeleteAddress?id=${id}`);
    } 
    onPost(Address: object){
  
      return this.http.post<IAddAddress>(`${this.apiRoot}/Address/InsertAddress`, Address);
    }
    onPut(id:number ,Address: object){
      
      const editAddress = Address as IAddAddress;
      return this.http.put(`${this.apiRoot}/Address/UpdateAddress?id=${id}`, editAddress);
      } 
   
  }
  

