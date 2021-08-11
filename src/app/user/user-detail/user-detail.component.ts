import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from '../User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  user: User | undefined;
  user$: Subscription | undefined;
  
  constructor(protected readonly http: HttpClient, private route: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.user$?.unsubscribe();
  }

  ngOnInit(): void {
    const userID: number =
      this.route.snapshot.params['id'];
    const url =` http://localhost:3000/users`;
    this.user$ = this.http.get<User[]>(url).subscribe(
      users => {
        users.forEach(user => {
          if(user.id == userID) this.user = user;
        });
      }
    );
  }

}
