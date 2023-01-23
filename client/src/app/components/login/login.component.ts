import { Component, Host, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// import { DetailsService } from 'src/app/core/services/details.service';
import { UserService } from 'src/app/core/services/user.service';
import { LoginService } from 'src/app/core/services/login.service';
import { data } from 'jquery';
import { faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})

export class LoginComponent implements OnInit {
  title = 'FeedbackForm';
  public user!: SocialUser;
  loggedIn!: boolean;
  private accessToken = '';
  keyIcon = faKey;
  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: SocialAuthService,
              private httpClient: HttpClient,
              private userService: UserService,
              private loginService: LoginService){
    }

  ngOnInit(): void {
    this.authService?.authState.subscribe((user) => {
        if(user){
          if(user?.role=="admin")
        { 
          localStorage.setItem("isAdmin", 'true')
        } else
        {
          localStorage.setItem("isAdmin", 'false')
        }
          if(user?.email.includes("@sequencetechno.com")){
            this.user = user;
            this.loggedIn = (user != null);
            this.userService.postUser(this.user).subscribe((res:any) => {
              this.loginService.postForm(this.user).subscribe((res:any) => {});
              localStorage.setItem('user', JSON.stringify(this.user));
              this.router.navigate(['/dashboard']);
              console.log(this.user);
            })
          }
          else{
            alert('Sorry! You can\'t sign in!');
            console.log("Failed");
          }
        }
      });
    }

  signInWithGoogle(): void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((data) => {localStorage.setItem('google-auth', JSON.stringify(data));
    });
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  } 

}

