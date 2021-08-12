import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as UserAction from "./user.action";
import { UserState } from "./user.state";

const initialState: UserState = {
    filterText:""
};

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserAction.updateSearchText, (state, action): UserState => {
      return {
        ...state,
        filterText: action.filterText
      };
    })
  );


  const getUserFeatureState = createFeatureSelector<UserState>('Users');
  export const getFilterText = createSelector(
    getUserFeatureState,
    state => state?.filterText
  );