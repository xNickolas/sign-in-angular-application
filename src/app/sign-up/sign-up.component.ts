import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { UserService } from './../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log(this.signUpForm);

    if (this.signUpForm.invalid) {
      return;
    }

    this.userService.register(this.signUpForm.value)
    .pipe(
      first(),
    )
    .subscribe(
      data => {
        this.router.navigate(['/sign-in']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
