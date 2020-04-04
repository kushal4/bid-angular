import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BidService {

  readonly BASE_URL="http://localhost:3003/api";
  readonly PRODUCT_BIDS_URL_FETCH="/products";
  constructor(private http:HttpClient) { }
  readonly BIDS_URL="/bids";

  getProductBids(){
    return new Promise((resolve,reject)=>{
     // console.log(this.BASE_URL);
      let fetch_url=this.BASE_URL+this.PRODUCT_BIDS_URL_FETCH;
      this.http.get(fetch_url).subscribe(products_bids=>{
        if(products_bids["code"]==200){
          resolve(products_bids)
        }else{
          reject(products_bids);
        }
      })
    })
  }

  saveBids(bids_obj){
      let save_url=this.BASE_URL+this.BIDS_URL;
      return new Promise((resolve,reject)=>{
        this.http.post(save_url,bids_obj).subscribe(bids_response=>{
          if(bids_response["code"]==200){
            resolve(bids_response["bids"]);
          }else{
              reject(bids_response);
          }
        })
      })

  }

  removeBid(bid_id,product_id){
    let delete_url=`${this.BASE_URL}${this.BIDS_URL}/${product_id}/${bid_id}`;
    //console.log(delete_url);
    return new Promise((resolve,reject)=>{
        this.http.delete(delete_url).subscribe(bids_response=>{
          if(bids_response["code"]==200){
            resolve(bids_response["bids"]);
          }else{
              reject(bids_response);
          }
        })
    });
  }

  finalizeBid(bid_id,product_id){
    let finalize_url=`${this.BASE_URL}${this.BIDS_URL}/${product_id}/${bid_id}`;
    return new Promise((resolve,reject)=>{
      this.http.put(finalize_url,{
        is_finalized:true
      }).subscribe(bids_response=>{
        if(bids_response["code"]==200){
          resolve(bids_response["bids"]);
        }else{
            reject(bids_response);
        }
      })
  });
  }


}
