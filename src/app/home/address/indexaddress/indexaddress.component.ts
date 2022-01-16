
import {Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from  'ngx-bootstrap/modal/';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {IAddress} from '../AddressService/address.model'
import {AddressService} from '../AddressService/address.service'
import { AddaddressComponent } from '../addaddress/addaddress.component';
import { EditaddressComponent } from '../editaddress/editaddress.component';

@Component({
  selector: 'app-indexaddress',
  templateUrl: './indexaddress.component.html',
  styleUrls: ['./indexaddress.component.css']
})
export class IndexaddressComponent implements OnInit {

  editMode:boolean = false;
  Addresses :  IAddress[]; 
 DeletedName : string;
 loadingdata :boolean= false;
 postdata :boolean= false;
 personid:number;
 isChecked:boolean = false;
 checkedAddresses:Array<number> = [];
 bsModalRef: BsModalRef;
 closeResult: string; 

 page =1;//current Page
 count :number; //total pages
 pageSize = 10; // number of items in each page
 mod:number=0;
 constructor(private ref: ChangeDetectorRef,private ngbModal: NgbModal,private modalService: BsModalService,private Addresseserv:AddressService)  { }


 ngOnInit() {
  this.addressList()
}
addressList() {
  
  this.Addresseserv.getAddressesList()
    .subscribe(
      response => {
        
       this.loadingdata= true;
        const jsonValue = JSON.stringify(response);
        const valueFromJson = JSON.parse(jsonValue);
        this.Addresses = ((valueFromJson || {}));
        this.count = this.Addresses.length;
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
  this.bsModalRef = this.modalService.show(AddaddressComponent,config);
  this.bsModalRef.content.closeBtnName = 'Close';  
  this.bsModalRef.content.event.subscribe(res => {
    this.addressList();
   
 });
}
openEditModalWithComponent(id:number) {
  
  this.editMode = true;
  const initialState = {
    list: [
      {"tag":'Count',"value":id}
    ]
  };
  this.bsModalRef = this.modalService.show(EditaddressComponent, {initialState, backdrop: 'static',  keyboard: false,    animated: true,
  ignoreBackdropClick: true,});
  this.bsModalRef.content.closeBtnName = 'Close';  
  this.bsModalRef.content.event.subscribe(res => {
    this.addressList();
    
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
  
  this.Addresseserv.onDelete(id).subscribe(data=>{       
      this.addressList();
    },err=>{});  
}


}

