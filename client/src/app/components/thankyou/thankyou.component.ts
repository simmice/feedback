import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  constructor(private router: Router,
    private authService: SocialAuthService) { }

  ngOnInit(): void {
  }

  okButton(){
    this.authService.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
