import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../models/user.interface';
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-logged-page',
  templateUrl: './logged-page.component.html',
  styleUrls: ['./logged-page.component.scss']
})
export class LoggedPageComponent implements OnInit, OnDestroy {

  currentUser: User;
  users: User[];
  currentUserSubscription: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentUserSubscription.unsubscribe();
    }

  ngOnInit() {
    this.loadAllUsers();
  }


  private loadAllUsers() {
    this.userService.getAll()
    .pipe(
      first(),
    )
    .subscribe(
      users => {
        this.users = users;
      }
    );
  }

  deleteUser(id: number) {
    this.userService.delete(id)
    .pipe(
      first(),
    )
    .subscribe(
      () => {
        this.loadAllUsers()
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }

}
