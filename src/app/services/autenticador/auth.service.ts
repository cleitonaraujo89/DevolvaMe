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
    const user = await this.afAuth.signInWithEmailAndPassword(email, password);
    const uid = user.user?.uid;
    return uid
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const user = await this.afAuth.signInWithPopup(provider);
    const uid = user.user?.uid;
    return uid
  }

  async register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
  
  async signOut() {
    return await this.afAuth.signOut();
  }
}