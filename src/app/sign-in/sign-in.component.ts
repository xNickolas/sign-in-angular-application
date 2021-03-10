import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  singInForm: FormGroup;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.singInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '#';
  }

  get f() { return this.singInForm.controls; }

  onSubmit() {
    if (this.singInForm.invalid) {
      return;
    }

    this.authService.login(this.f.username.value, this.f.password.value)
    .pipe(
      first(),
    )
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log('erro no login', error);
      }
    );
  }

}
