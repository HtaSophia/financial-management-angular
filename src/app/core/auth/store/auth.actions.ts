import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';

const AUTH = '[Auth Page]';
export const logIn = createAction(`${AUTH} Login`, props<{ email: string }>());
export const logInSuccess = createAction(`${AUTH} Login Success`, props<{ user: User }>());
export const logInError = createAction(`${AUTH} Login Error`, props<{ error: string }>());

export const logOut = createAction(`${AUTH} Log Out`);
export const logOutSuccess = createAction(`${AUTH} Log Out Success`);
export const logOutError = createAction(`${AUTH} Log Out Error`, props<{ error: string }>());
