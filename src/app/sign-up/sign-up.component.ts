import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService } from './../services/alert.service';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  loading = false;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      fullname: ['',  Validators.compose([Validators.required, Validators.minLength(3)])],
      username: ['', [Validators.required, Validators.email]],
      password: ['',  Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  get f() { return this.signUpForm.controls; }

  onSubmit() {
    // console.log(this.signUpForm);

    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.signUpForm.value)
    .pipe(
      first(),
    )
    .subscribe(
      data => {
        this.router.navigate(['/sign-in']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
        console.log(error);
      }
    );
  }

  // showError(controlName: string) {
  //   if (!this.signUpForm.get(controlName)) {
  //     return false;
  //   }
  //   return this.signUpForm.get(controlName).invalid && this.signUpForm.get(controlName).touched;
  // }

}
