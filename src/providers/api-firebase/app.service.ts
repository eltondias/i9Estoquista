import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from './../../environments/environment';

@Injectable()
export class AppService {
  private firestore: firebase.firestore.Firestore;
  private auth: firebase.auth.Auth;

  constructor() {
    this.initializeApp();
  }

  private initializeApp() {
    if (!firebase.apps.length) {
       firebase.initializeApp(environment.firebaseConfig);
    } else {
       firebase.app();
    }
  }

  initializeFirestore(): firebase.firestore.Firestore {
    this.firestore =  firebase.firestore();
    // const settings = {timestampsInSnapshots: true};
    // this.firestore.settings(settings);
    return this.firestore;
  }

  initializeAuth(): firebase.auth.Auth {
    this.auth =  firebase.auth();
    return this.auth;
  }
}
