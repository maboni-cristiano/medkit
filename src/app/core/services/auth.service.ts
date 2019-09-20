import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, AuthProvider, AuthOptions } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
    this.logout();

  }

  get isAuthenticated(): Observable <boolean> {
    return this.authState$.pipe(map(user => user !== null));
  }

  authenticate({ isSignIn, provider, user}: AuthOptions): Promise <auth.UserCredential> {
    let operation: Promise <auth.UserCredential>;
    if (provider !== AuthProvider.Email) {
      operation = this.loginPopup(provider);
    } else {
      operation = isSignIn ? this.loginEmailSenha(user) : this.cadastrarEmailSenha(user);
    }

    return operation;
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  private loginEmailSenha({ email, password }: User): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private cadastrarEmailSenha({email, password, name}: User): Promise<auth.UserCredential> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials =>
        credentials.user
          .updateProfile({ displayName: name, photoURL: null })
          .then(() => credentials)
      );
  }
  private loginPopup(provider: AuthProvider): Promise<auth.UserCredential> {
    let loginProvider = null;

    switch (provider) {
      case AuthProvider.Facebook:
        loginProvider = new auth.FacebookAuthProvider();
        break;
    }

    return this.afAuth.auth.signInWithPopup(loginProvider);
  }
}
