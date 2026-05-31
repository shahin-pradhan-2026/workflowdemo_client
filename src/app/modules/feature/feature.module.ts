import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';
import { AttachmentService } from 'src/app/core/services/settings/attachment.service';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AgGridModule } from 'ag-grid-angular';
import { DashboardService } from 'src/app/core/services/complain/dashboard.service';
import { DashboardComponent } from './dashboard/dashboard.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
    declarations: [ DashboardComponent],
    providers: [
      DashboardService,
      AttachmentService
  ],
    imports: [
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
        FeatureRoutingModule,
        UIModule,
        Ng2SmartTableModule,
        OwlDateTimeModule,
        AgGridModule,
        OwlNativeDateTimeModule,
        AgmCoreModule.forRoot({
          // apiKey: 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0',
          apiKey: environment.MAP_API_KEY,
          libraries: ['places', 'drawing', 'geometry']
        }),
    ]
    
    
})
export class FeatureModule { }
