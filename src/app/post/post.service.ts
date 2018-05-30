import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 

import { Observable, from } from '@sanity/observable';
import 'rxjs-compat/add/operator/map';
import { Post} from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore) { 
    this.postCollection = this.afs.collection("posts", list => list.orderBy("date","desc"));
  }

  create(data: Post) {
    return this.postCollection.add(data);
  }

  getPosts(): Observable<Post[]> {
    return this.postCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return  { id, ...data };
      });
    });
  }

}
