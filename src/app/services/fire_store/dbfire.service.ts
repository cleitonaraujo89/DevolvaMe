import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from 'src/app/interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class DBfireService {
 
  constructor(private afs: AngularFirestore) {}

  createUser(user: User) {
    return this.afs.collection('Usuarios').doc(user.uid).set(user);
  }

  getUser(uid: string) {
    return this.afs.collection('Usuarios').doc(uid).valueChanges();
  }
}
