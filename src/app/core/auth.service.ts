import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import { AngularFireAuth } from 'angularfire2/auth'; 
import { Md5 } from 'ts-md5/dist/md5';
import * as firebase from 'firebase/app';

import { Observable, from, of } from '@sanity/observable';
import 'rxjs-compat/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user = this.afAuth.authState.switchMap(user => {
      if(user) {
        return  this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });

    this.afAuth.authState.subscribe(data => {
      this.authState = data;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }
  
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }
  
  get currentUserPhoto(): string {
    return this.authenticated ? this.authState.photoURL : null;
  }
  
  get currentUserName(): string {
    return this.authenticated ? this.authState.displayName : null;
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then(() => console.log("logged in"))
                .catch(error => console.log(error.message));
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(user => this.updateUserData(user.user))
    .then(() => console.log("account created"))
    .catch(error => console.log(error.message));
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      this.updateUserData(credential.user);
    });
  }
    
  loginWithFb() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      this.updateUserData(credential.user);
    });
  }

  signOut() {
    return this.afAuth.auth.signOut()
                .then(() => {
                  this.router.navigate(['/signin']);
                })
  }

  private updateUserData(user) {
    console.log(user);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName,
      photoURL: user.photoURL ||
          "http://www.gravatar.com/avatar/" + Md5.hashStr(user.uid) + "?d=mp"
    };
    return userRef.set(data, { merge: true });
  }
}
