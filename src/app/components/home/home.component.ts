import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductoInterface } from 'src/app/shared/producto.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  private path = 'Productos/';
  constructor(
    private firestoreService: FirestoreService,
    private router: Router
    ){}
  producto: ProductoInterface = {
    descripcion: '',
    precio: null,
    img: '',
    titulo: ''
  };
  title = 'angular-paypal-payment';

  productos: ProductoInterface[] = [];
  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.getPublications();
  }
  getPublications(){
    this.firestoreService.getCollection<ProductoInterface>(this.path).subscribe( res => {  // res - respuesta del observador
    this.productos = res;
    console.log('publi', res);
   });
  }
  gotoProduct(id: string){
    this.router.navigate(['/product', id]);
  }
}
