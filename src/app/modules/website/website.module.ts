import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { AgGridModule } from 'ag-grid-angular';
import { SliderComponent } from './slider/slider.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { NoticeComponent } from './notice/notice.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// npm install --save @ckeditor/ckeditor5-angular
@NgModule({
  declarations: [SliderComponent,NoticeComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    WebsiteRoutingModule,
    UIModule,
    Ng2SmartTableModule,
    AgGridModule,
    CKEditorModule

],
  
})
export class WebsiteModule { }
