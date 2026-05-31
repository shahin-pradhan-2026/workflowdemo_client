import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentAttendanceComponent } from './agent-attendance/agent-attendance.component';
import { AgentReportComponent } from './agent-report/agent-report.component';
import { AgentFaceRegistrationComponent } from './agent-face-registration/agent-face-registration.component';
import { AgentMacApprovalComponent } from './agent-mac-approval/agent-mac-approval.component';

const routes: Routes = [
  
  { path: 'agent-attendance', component: AgentAttendanceComponent },
  { path: 'agent-report', component: AgentReportComponent },
  { path: 'agent-face-registration', component: AgentFaceRegistrationComponent },
  { path: 'agent-mac-approval', component: AgentMacApprovalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
