import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from 'src/app/interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class DBfireService {
 /*  private dadosUsuario: AngularFirestoreCollectionGroup<DadosFireBase> */

  constructor(private afs: AngularFirestore) { 
    // this.dadosUsuario = this.afs.collection<DadosFireBase>('Usuarios');
  }

  createUser(user: User) {
    return this.afs.collection('Usuarios').doc(user.id).set(user);
  }

  getUser(uid: string) {
    return this.afs.collection('Usuarios').doc(uid).valueChanges();
  }
}
