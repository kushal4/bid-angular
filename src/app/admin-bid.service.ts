import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminBidService {

  readonly BASE_URL="http://localhost:3003/api";
  readonly productsUri="/products";

  constructor(private http:HttpClient) { }

  saveProduct(product){

    return new Promise((resolve,reject)=>{
      let save_endpoint=this.BASE_URL+this.productsUri;
      this.http.post(save_endpoint,product).subscribe(products=>{
          if(products["code"]==200){
              resolve(products);
          }else{
            reject(products);
          }
      });

      })

  }

  removeProduct(productId){
    let delete_endpoint=`${this.BASE_URL}${this.productsUri}/${productId}`;
    return new Promise((resolve,reject)=>{
    this.http.delete(delete_endpoint).subscribe(products=>{
      if(products["code"]==200){
          resolve(products["products"]);
      }else{
          reject(products);
      }
  });

    });
  }


}
