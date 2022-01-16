import {Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from  'ngx-bootstrap/modal/';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from '../personService/person.service';
import { AddpersonComponent } from '../addperson/addperson.component';
import { EditpersonComponent } from '../editperson/editperson.component';
import { IPerson } from '../personService/person.model';
@Component({
  selector: 'app-indexperson',
  templateUrl: './indexperson.component.html',
  styleUrls: ['./indexperson.component.css']
})
export class IndexpersonComponent implements OnInit {
  editMode:boolean = false;
  persons :  IPerson[]; 
 DeletedName : string;
 loadingdata :boolean= false;
 postdata :boolean= false;
 personid:number;
 isChecked:boolean = false;
 checkedpersons:Array<number> = [];
 bsModalRef: BsModalRef;
 closeResult: string; 

 page =1;//current Page
 count :number; //total pages
 pageSize = 10; // number of items in each page
 mod:number=0;
 constructor(private ref: ChangeDetectorRef,private ngbModal: NgbModal,private modalService: BsModalService,private personServ:PersonService)  { }


 ngOnInit() {
  this.personList()
}
personList() {
  
  this.personServ.getPersonsList()
    .subscribe(
      response => {
        
       this.loadingdata= true;
        const jsonValue = JSON.stringify(response);
        const valueFromJson = JSON.parse(jsonValue);
        this.persons = ((valueFromJson || {}));
        this.count = this.persons.length;
        if(this.editMode){
          this.editMode=false;
          }
        else{
          if((this.count % this.pageSize)>0)
          {
             this.mod=1;
          }
        else
          {
            this.mod=0;
          }
          const countPage = ~~(((this.count)/this.pageSize)) + this.mod;
          this.page=countPage;
        }
        this.ref.detectChanges();
      },
      error => {
        
      });
}
handlePageChange(event) { // event is number of the new page
  this.page = event;
}

openModalWithComponent() {
  const config: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    animated: true,
    ignoreBackdropClick: true,
  };
  this.bsModalRef = this.modalService.show(AddpersonComponent,config);
  this.bsModalRef.content.closeBtnName = 'Close';  
  this.bsModalRef.content.event.subscribe(res => {
    this.personList();
   
 });
}
openEditModalWithComponent(id:number) {
  
  this.editMode = true;
  const initialState = {
    list: [
      {"tag":'Count',"value":id}
    ]
  };
  this.bsModalRef = this.modalService.show(EditpersonComponent, {initialState, backdrop: 'static',  keyboard: false,    animated: true,
  ignoreBackdropClick: true,});
  this.bsModalRef.content.closeBtnName = 'Close';  
  this.bsModalRef.content.event.subscribe(res => {
    this.personList();
    
 }); 

}
openDelete(content, personID,personNameDelete) {  
  ;
  this.DeletedName = personNameDelete;
  this.ngbModal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
    this.closeResult = `Closed with: ${result}`;  
    if (result === 'yes') {  
      this.deleteHero(personID);  
    }  
  }, (reason) => {  
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
  });  
}  

private getDismissReason(reason: any): string {  
  if (reason === ModalDismissReasons.ESC) {  
    return 'by pressing ESC';  
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
    return 'by clicking on a backdrop';  
  } else {  
    return `with: ${reason}`;  
  }  
}  

deleteHero(id) {  
  
  this.personServ.onDelete(id).subscribe(data=>{       
      this.personList();
    },err=>{});  
}


}

