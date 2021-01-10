import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ProductoInterface } from 'src/app/shared/producto.interface';
import { ActivatedRoute } from '@angular/router';

declare var paypal;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  idProducto: string;
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    ){}
  producto: ProductoInterface = {
    descripcion: '',
    precio: null,
    img: '',
    titulo: ''
  };
  title = 'angular-paypal-payment';
  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.getDetailsProduct();
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.producto.titulo,
              amount: {
                currency_code: 'USD',
                value        : this.producto.precio
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
      },
      onError: err => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
  }
  getDetailsProduct(){
    this.idProducto = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getOnePublication(this.idProducto).subscribe(res => {
      this.producto = res;
      console.log('publication->', res);
    });
  }
}
