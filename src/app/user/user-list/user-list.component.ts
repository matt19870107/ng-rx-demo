import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../User';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { UserState } from '../state/user.state';
import { getFilterText } from '../state/user.reducer';
import { updateSearchText } from '../state/user.action';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  filteredUsers$: Observable<User[]> | undefined;
  private nameFilter$: Observable<string> | undefined;
  private _name! : string;

  constructor(protected readonly http: HttpClient, private store: Store<{ UserState: UserState }>) { }

  ngOnInit(): void {

    this.nameFilter$ = this.store.select(getFilterText);

    const url =` http://localhost:3000/users`;
    this.filteredUsers$ = combineLatest([
      this.http.get<User[]>(url),
      this.nameFilter$
    ])
      .pipe(
        map(([users, name]) =>{
            this._name = name;
            return users.filter(user =>
              name==="" || name===null || name===undefined || user.username.includes(name)
            )
          })
      );
  }

  set name(name : string) {
    this.store.dispatch(updateSearchText({filterText: name}));
  }

  get name(): string{
    return this._name;
  }

}
