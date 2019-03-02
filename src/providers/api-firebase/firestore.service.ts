import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class FirestoreService {
  private firestore: firebase.firestore.Firestore;
  private collection: firebase.firestore.CollectionReference;

  constructor(private app: AppService) {
    this.firestore = this.app.initializeFirestore();
  }

  public getCollection(collection: string) {
    // this.firestore.enablePersistence();
    this.collection = this.firestore.collection(collection);
    return this.collection;
  }

  public getSnapshotData(filtro: firebase.firestore.Query, itens) {
    const itensDoc: firebase.firestore.QueryDocumentSnapshot[] = [];

    filtro.onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
      snapshot.docChanges().forEach(change => {
        console.log('Novo item')
        if (change.type === 'added') {
          itens.push(change.doc.data());
          itensDoc.push(change.doc);
        }
        if (change.type === 'modified') {
          console.log('Item atualizado')
          const item = itensDoc.filter(doc => doc.id === change.doc.id);
          const indice = itensDoc.indexOf(item[0]);
          if (indice > -1) {
            itens[indice] = change.doc.data();
            itensDoc[indice] = change.doc;
          }
        }
        if (change.type === 'removed') {
          console.log('Item removido')
          const item = itensDoc.filter(doc => doc.id === change.doc.id);
          const indice = itensDoc.indexOf(item[0]);
          if (indice > -1) {
            itens.splice(indice, 1);
            itensDoc.splice(indice, 1);
          }
        }
      });
    });
  }

  public getSnapshot(filtro: firebase.firestore.Query, itensDoc: firebase.firestore.QueryDocumentSnapshot[]) {
    filtro.onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          itensDoc.push(change.doc);
        }
        if (change.type === 'modified') {
          const item = itensDoc.filter(doc => doc.id === change.doc.id);
          const indice = itensDoc.indexOf(item[0]);
          if (indice > -1) {
            itensDoc[indice] = change.doc;
          }
        }
        if (change.type === 'removed') {
          const item = itensDoc.filter(doc => doc.id === change.doc.id);
          const indice = itensDoc.indexOf(item[0]);
          if (indice > -1) {
            itensDoc.splice(indice, 1);
          }
        }
      });
    });
  }

  getDocs(collection:  firebase.firestore.CollectionReference): Observable<any> {
    const observable = new Observable(observer => {
      const itens = [];
      const filtro =  collection;
      this.getSnapshot(filtro, itens);
      observer.next(itens);
    });
    return observable;
  }

  getDocsData(collection:  firebase.firestore.Query): Observable<any> {
    const observable = new Observable(observer => {
      const itens = [];
      const filtro =  collection;
      this.getSnapshotData(filtro, itens);
      // console.log(itens);
      observer.next(itens);
    });
    return observable;
  }

}
