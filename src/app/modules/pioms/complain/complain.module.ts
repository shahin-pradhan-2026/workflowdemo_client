import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { PermissionService } from 'src/app/core/services/settings/permission.service';
import { AgGridModule } from 'ag-grid-angular';
import { GlobalSettingService } from 'src/app/core/services/settings/global-setting.service';
import { NotificationAreaService } from 'src/app/core/services/settings/notification-area.service';
import { UserRoleService } from 'src/app/core/services/settings/user-role.service';
import { ComplainRegisterComponent } from './complain-register/complain-register.component';
import { ComplainRoutingModule } from './complain-routing.module';
import { ComplainListComponent } from './complain-list/complain-list.component';
import { ComplainService } from 'src/app/core/services/complain/complain.service';
import { ComplainCategoryService } from 'src/app/core/services/complain/complain-category.service';
import { UserService } from 'src/app/core/services/settings/user.service';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    ComplainRegisterComponent,
    ComplainListComponent,

  ],
  imports: [
    ComplainRoutingModule,
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
    
    
  ],
  providers: [
    ComplainService,   
    PermissionService,
    GlobalSettingService,
    NotificationAreaService,
    UserRoleService,
    UserService,
    ComplainCategoryService
  
  ]
})
export class ComplainModule { }
