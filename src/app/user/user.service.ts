import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 

import { Observable, from } from '@sanity/observable';
import 'rxjs-compat/add/operator/switchMap';

import { User } from './user.model';
import { AuthService } from 'src/app/core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  
  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  getUsers() {
    this.userCollection = this.afs.collection('users');
    return this.userCollection.valueChanges();
  }

  getUser(id: string) {
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    return this.userDoc.valueChanges();
  }

  updateProfileName(displayName: string) {
    const user = this.authService.authState;
    const data = { displayName };
    return user.updateProfile(data)
            .then(() => this.afs.doc(`users/${user.uid}`).update({ displayName }))
            .then(() => console.log("Updated profile"))
            .catch(error => console.log(error.message));
  }

  getUserPhoto(id: string): string {
    let url = this.getUser(id).subscribe(s => url = s.photoURL);
    console.log(url);
    return url;
  }

  updateUserData(data: any) {
    const uid = this.authService.currentUserId;
    
    return this.afs.doc(`users/${uid}`).update(data);
  }
}
