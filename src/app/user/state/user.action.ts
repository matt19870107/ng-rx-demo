import { createAction, props } from '@ngrx/store';

export const updateSearchText = createAction('[User Component] Update Search Text', props<{ filterText: string }>());