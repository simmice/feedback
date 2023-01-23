import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LoginComponent } from './components/login/login.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { AuthGuard } from './core/authServices/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Feedbackform2Component } from './components/feedbackform2/feedbackform2.component';
import { Feedbackform3Component } from './components/feedbackform3/feedbackform3.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'feedbackform2', component: Feedbackform2Component},
  {path: 'feebackform3', component: Feedbackform3Component},
  //  canActivate: [AuthGuard]},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'link', component: NotFoundComponent}
];
const adminRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'feedbackform2', component: Feedbackform2Component},
  {path: 'feebackform3', component: Feedbackform3Component},
  //  canActivate: [AuthGuard]},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'link', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(localStorage.getItem("isAdmin")=='true'?adminRoutes:routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
