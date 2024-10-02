import { createFeature, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../user.model';

interface State {
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: State = {
    isAuthenticated: false,
    user: null,
};

const reducer = createReducer(
    initialState,
    on(AuthActions.logIn, (state) => ({ ...state })),
    on(AuthActions.logInSuccess, (state, { user }) => ({ ...state, isAuthenticated: true, user })),
    on(AuthActions.logInError, (state) => ({ ...state, isAuthenticated: false })),
    on(AuthActions.logOut, (state) => ({ ...state, isAuthenticated: false })),
    on(AuthActions.logOutSuccess, (state) => ({ ...state, isAuthenticated: false })),
    on(AuthActions.logOutError, (state) => ({ ...state, isAuthenticated: false }))
);

export const authFeature = createFeature({
    name: 'auth',
    reducer,
});

export const { selectIsAuthenticated, selectUser } = authFeature;
