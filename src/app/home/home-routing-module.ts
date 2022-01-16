import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PersonComponent } from './person/person.component';
import { AddressComponent } from './address/address.component';
import { IndexpersonComponent } from './person/indexperson/indexperson.component';
import { IndexaddressComponent } from './address/indexaddress/indexaddress.component';
const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  children: [
    {
      path: 'person',
      component: PersonComponent,
      children: [
        {path: '' , component: IndexpersonComponent},
      ]
    },
    {
      path: 'address',
      component: AddressComponent,
       children: [
        {path: '' , component: IndexaddressComponent},
      ]
    },
    {
      path: '',
      redirectTo: 'person',
      pathMatch: 'full',
    },





  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})



  export class HomeRoutingModule { }



