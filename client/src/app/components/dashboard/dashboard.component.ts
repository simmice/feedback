import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authServices/auth.service';
// import { DetailsService } from 'src/app/core/services/details.service';

import { SocialAuthService } from '@abacritt/angularx-social-login';
import { FormService } from 'src/app/core/services/form.service';
import { MatCard } from '@angular/material/card';
import { faStream } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public userDetails: any;
  detailsForm!: FormGroup;
  selectedService: string = '';
  services: any = [
    'Service 1',
    'Service 2',
    'Service 3'
  ];
  streamIcon = faStream;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    // private detailsService: DetailsService,
    private authService: SocialAuthService,
    private formService: FormService) {
    this.detailsForm = this.formBuilder.group({
      services: ['']
    });}

  ngOnInit(): void {
    const storage = localStorage.getItem('user');

    if(storage){
      this.userDetails = JSON.parse(storage);
    } else {
      // this.signOut();
    }
  }


  // radioServices (event: any){
  //   const storage = localStorage.getItem('user');
  //   let email ='';
  //   if(storage){
  //     email =JSON.parse(storage)?.email;
  //   }
  //   this.formService.postStatus(email).subscribe((res:any) => {
  //   if(event.target.value==this.services[0]){
  //     this.router.navigate(['/feedback'], { state: { service: 'service1' } });
  //   } if (event.target.value==this.services[1]){
  //     this.router.navigate(['/feedbackform2'], { state: { service: 'service2' } });
  //   } if (event.target.value==this.services[2]) {
  //     this.router.navigate(['/feebackform3'], { state: { service: 'service3' } });
  //   }
  // });
  // }

  clickEvent1(){
    this.router.navigate(['/feedback']);
  }

  clickEvent2(){
    this.router.navigate(['/feedback2']);
  }

  clickEvent3(){
    this.router.navigate(['/feedback3']);
  }

  // onSubmit(form: NgForm){    
  //   this.detailsService.postDetails(this.selectedService).subscribe((res:any) => {
  //     console.log(this.selectedService); 
  //     this.router.navigate(['/feedback']);
  //   });
  // }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
