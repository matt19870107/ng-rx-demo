import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';

const userRoutes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id', component: UserDetailComponent }
];

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    StoreModule.forFeature("Users", userReducer)
  ]
})
export class UserModule { }
