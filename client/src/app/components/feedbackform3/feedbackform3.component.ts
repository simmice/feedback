import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

import { FormService } from 'src/app/core/services/form.service';
import { data } from 'jquery';

@Component({
  selector: 'app-feedbackform3',
  templateUrl: './feedbackform3.component.html',
  styleUrls: ['./feedbackform3.component.css'],
  providers: [FormService]
})
export class Feedbackform3Component implements OnInit {

  feedbackForm!: FormGroup; 
  userLogged!: SocialUser;
  isLogged!: boolean;
  selectedOption: string = '';
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
      'options4': '',
      'text0': '',
      'text2': ''
    })
  }

  seeTextbox(): void{
    if(this.options4 === 'Unsatisfactorily'){
      this.showMe= true;
    }
  }

  submitData(form: NgForm){
    console.log(this.feedbackForm);
    this.formService.postForm(form).subscribe((res:any) => {
      console.log(this.selectedOption);
      this.router.navigate(['/thankyou']);
    })
  }

  signOut(): void {
    this.authService.signOut().then(data => {
      console.log(data);
    });
  }

  reviewForm(){
    
  }

}

