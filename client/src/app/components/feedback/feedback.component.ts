import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

import { FormService } from 'src/app/core/services/form.service';
import { data } from 'jquery';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [FormService]
})
export class FeedbackComponent implements OnInit {

  public service: string = '';

  feedbackForm!: FormGroup; 
  userLogged!: SocialUser;
  isLogged!: boolean;
  selectedOption: string = '';
  public formDetails: any;
  public isReview: boolean = false;
  options1: any = [
    'Yes',
    'No'
  ];
  options2: any = [
    1, 2, 3, 4
  ];
  text1!: [''];
  options3: any = [
    'Extremely',
    'Very',
    'Moderately',
    'Slightly',
    'Not at all'
  ];
  options4: any = [
    'Excellent',
    'Good',
    'Fair',
    'Poor',
    'Unsatisfactorily'
  ];
  text0!: [''];
  text2!: [''];
  showMe= false;
  message="hii";

  constructor(private formBuilder: FormBuilder,
  private router: Router,
  private authService: SocialAuthService,
  private formService: FormService){
    this.service=this.router?.getCurrentNavigation()?.extras.state?.['service'];
    this.feedbackForm = this.formBuilder.group({
      options1: [''],
      options2: [''],
      text1: [''],
      options3: [''],
      options4: [''],
      text0: [''],
      text2: ['']
    })
  }

  ngOnInit(): void {
    this.authService.authState.subscribe(data => {
      this.userLogged = data;
      this.isLogged = this.userLogged != null;
    });

    this.feedbackForm = this.formBuilder.group({
      'options1': ['', [Validators.required]],
      'options2': ['', [Validators.required]],
      'text1': '',
      'options3': ['', [Validators.required]],
      'options4': ['', [Validators.required]],
      'text0': '',
      'text2': ''
    })
  }

  seeTextbox(event: any){
    if(event.target.id==this.options4[4]){
      this.showMe = true;
      // console.log(" yes this is option 4");
    } else {this.showMe = false;}
  }

  submitData(form: NgForm){
    const storage = localStorage.getItem('user');
    let email ='';
    if(storage){
      email =JSON.parse(storage)?.email;
    }
    this.formService.postForm({...form, service:this.service, email:email}).subscribe((res:any) => {
      console.log(this.selectedOption);
      this.router.navigate(['/thankyou']);
    });
    
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  reviewForm(){
    this.formDetails = this.feedbackForm.value;
    this.isReview = true;
  }

  editForm(){
    this.isReview = false;
  }

}
