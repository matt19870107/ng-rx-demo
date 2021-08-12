import {AppState} from '../../state/app.state'; 
export interface UserState extends AppState{
    filterText: string;
}