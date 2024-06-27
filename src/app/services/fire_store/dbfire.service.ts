import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from 'src/app/interfaces/user.model';
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DBfireService {
 
  constructor(private afs: AngularFirestore) {}

  createUser(user: User) {
    return this.afs.collection('Usuarios').doc(user.uid).set(user);
  }

  getUser(uid: string): Observable<User | undefined>  {
    return this.afs.collection('Usuarios').doc<User>(uid).valueChanges();
  }

  updateUser(uid: string, data: Partial<User>): Promise<void> {
    return this.afs.collection('Usuarios').doc(uid).update(data);
  
  }
}
