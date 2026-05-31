import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { NoticeComponent } from './notice/notice.component';

const routes: Routes = [
  { path: 'slider', component: SliderComponent },
  { path: 'notice', component: NoticeComponent },
];


@NgModule({
  declarations: [],
  providers: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
