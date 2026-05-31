import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplainRegisterComponent } from './complain-register/complain-register.component';
import { ComplainListComponent } from './complain-list/complain-list.component';
import { ComplainTrackingStageComponent } from './complain-tracking-stage/complain-tracking-stage.component';

const routes: Routes = [
  
  { path: 'complain-register/:id', component: ComplainRegisterComponent },
  { path: 'complain-list', component: ComplainListComponent },
  { path: 'complain-tracking-stage', component: ComplainTrackingStageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplainRoutingModule { }
