import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../User';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  filteredUsers$: Observable<User[]> | undefined;
  private nameFilter$ = new BehaviorSubject<string>("");


  constructor(protected readonly http: HttpClient) { }

  ngOnInit(): void {
    const url =` http://localhost:3000/users`;

    this.filteredUsers$ = combineLatest([
      this.http.get<User[]>(url),
      this.nameFilter$
    ])
      .pipe(
        map(([users, name]) =>
          users.filter(user =>
            name==="" || name===null || name===undefined || user.username.includes(name)
          ))
      );
  }

  set name(name : string) {
    this.nameFilter$.next(name);
}

}
