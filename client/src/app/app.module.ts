import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';

import { LoginComponent } from './components/login/login.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { Feedbackform2Component } from './components/feedbackform2/feedbackform2.component';
import { Feedbackform3Component } from './components/feedbackform3/feedbackform3.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { Details } from './core/services/details.model';
// import { DetailsService } from './core/services/details.service';
import { Form } from './core/services/form.model';
import { User } from './core/services/user.model';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedbackComponent,
    Feedbackform2Component,
    Feedbackform3Component,
    ThankyouComponent,
    NotFoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatRadioModule,
    MatListModule,
    SocialLoginModule,
    FontAwesomeModule,
    BackButtonDisableModule.forRoot()
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '316921854203-icmb356snur2hg5ktv435v3fegcjpe8b',
            )
            
          }
        ],
        onError: (err) => {
          alert("err")
          console.error(err);
        }
      } as SocialAuthServiceConfig,
      
    },Details, Form, User, 

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
