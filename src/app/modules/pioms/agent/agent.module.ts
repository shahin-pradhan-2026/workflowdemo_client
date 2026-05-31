import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { AgGridModule } from 'ag-grid-angular';
import { AgentRoutingModule } from './agent-routing.module';
import { AgentAttendanceComponent } from './agent-attendance/agent-attendance.component';
import { AgentReportComponent } from './agent-report/agent-report.component';
import { AgentAttendanceService } from 'src/app/core/services/pioms/agent-attendance.service';
import { AgentReportService } from 'src/app/core/services/pioms/agent-report.service';
import { AgmCoreModule } from '@agm/core';
import { AgentFaceRegistrationComponent } from './agent-face-registration/agent-face-registration.component';
import { AgentMacApprovalComponent } from './agent-mac-approval/agent-mac-approval.component';
import { AgentFaceRegistrationService } from 'src/app/core/services/pioms/agent-face-registration.service';



@NgModule({
  declarations: [
    AgentAttendanceComponent,
    AgentReportComponent,
    AgentFaceRegistrationComponent,
    AgentMacApprovalComponent
  ],
  imports: [
    AgentRoutingModule,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
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
    UIModule,
    Ng2SmartTableModule,
    AgGridModule,
    NgbAccordionModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      // apiKey: 'AIzaSyDsmRCwyjiDzB89HJXZbqT3pHvxXt-rE2M',
      apiKey: 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0',  // for lIve api
    }),
    
  ],
  providers: [
    AgentAttendanceService,
    AgentReportService,
    AgentFaceRegistrationService
  ]
})
export class AgentModule { }
