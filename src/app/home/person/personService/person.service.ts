import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {IPerson} from "./person.model"
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  apiRoot=environment.apiRoot;
  constructor(private http:HttpClient) { }
 
  getPersonsList():Observable<any>
  {
    return this.http.get(`${this.apiRoot}/Person/Getall`);
  }
  onGetPerson(id:number){
    
    return this.http.get(`${this.apiRoot}/Person/DetailsPerson?id=${id}`);  
  } 
  onDelete(id: number){
   ;
    return this.http.delete(`${this.apiRoot}/Person/DeletePerson?id=${id}`);
  } 
  onPost(person: object){

    return this.http.post<IPerson>(`${this.apiRoot}/Person/InsertPerson`, person);
  }
  onPut(id:number ,person: object){
    const editPerson = person as IPerson;
    return this.http.put(`${this.apiRoot}/Person/UpdatePerson?id=${id}`, editPerson);
    } 
 
}
