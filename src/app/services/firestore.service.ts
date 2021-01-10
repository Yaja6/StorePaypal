import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductoInterface } from '../shared/producto.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  producto: Observable<ProductoInterface>;
  productoDoc: AngularFirestoreDocument<ProductoInterface>;
  constructor(public database: AngularFirestore) { }

  createDoc(data: any, path: string, id: string): Promise <any>{ // path: ruta de base de datos id: id de documento
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string): Observable<ProductoInterface>{ // tipo es una variable cualquier auqe entra como argumento
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }


  updateDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }
  getId(){
    return this.database.createId();
  }
  getCollection<tipo>(path: string){
    const collection = this.database.collection<tipo>(path); // observador de la bd del tipo -> tipo
    console.log('collecc', collection);
    return collection.valueChanges();

  }
  getOnePublication(idp: string){
    this.productoDoc = this.database.doc<ProductoInterface>(`Productos/${idp}`);
    this.producto = this.productoDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data() as ProductoInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.producto;
  }

}
