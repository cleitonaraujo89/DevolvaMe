import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from 'firebase/auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async signInWithEmail(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await this.afAuth.signInWithPopup(provider);
  }

  async signOut() {
    return await this.afAuth.signOut();
  }
}