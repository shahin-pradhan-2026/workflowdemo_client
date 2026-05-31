import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), },
  { path: '', component: LayoutComponent, loadChildren: () => import('./modules/feature/feature.module').then(m => m.FeatureModule), canActivate: [AuthGuard] },
  { path: 'settings', component: LayoutComponent, loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuard] },
  { path: 'feature', component: LayoutComponent, loadChildren: () => import('./modules/feature/feature.module').then(m => m.FeatureModule), canActivate: [AuthGuard] },
  { path: 'complain', component: LayoutComponent, loadChildren: () => import('./modules/pioms/complain/complain.module').then(m => m.ComplainModule), canActivate: [AuthGuard] },
  { path: 'agent', component: LayoutComponent, loadChildren: () => import('./modules/pioms/agent/agent.module').then(m => m.AgentModule), canActivate: [AuthGuard] },
  // { path: 'website', component: LayoutComponent, loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule), canActivate: [AuthGuard] },
  
  // { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
