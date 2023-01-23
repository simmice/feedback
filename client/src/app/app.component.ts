import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'feedbackForm';
  constructor(public authService: SocialAuthService) { }
  signOut() {
    this.authService.signOut();
  }
}
