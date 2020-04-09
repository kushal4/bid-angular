import { AuthService } from './../auth.service';
import { BidService } from './../bid.service';
import { Component, OnInit } from '@angular/core';
import { AdminBidService } from '../admin-bid.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products:any=[];
  product={
      name:null
  }

  role="";
  constructor(private productService:AdminBidService,private bidService:BidService,private authService:AuthService) { }


  async ngOnInit(): Promise<void> {

    try{
      //let decoded_token=this.authService.decodeToken();
      //this.role=decoded_token["role"];
      let products_obj= await this.bidService.getProductBids();
      this.products=products_obj["products"];
      console.log(this.products);
    }catch(ex){
      console.log(ex);
    }

  }


  //Unit testing scenarios
  //1 expects input element
 async save(prodInput : HTMLInputElement){
  // console.log(this.product);
   prodInput.value="";
   try{
    let products_obj =await this.productService.saveProduct(this.product)
    //console.log("in save");
    //console.log(products_obj);
    this.products=products_obj["products"];
   }catch(ex){
     console.log(ex);
   }

  }

  async deleteBid(bid,product){
      const bid_id=bid["value"]["id"];
      const product_id=bid["value"]["product_id"];
      //console.log(bid_obj);
      try{
        product["value"]["bids"]=await this.bidService.removeBid(bid_id,product_id);
      }catch(ex){
        console.error(ex);
      }

  }

  async finalizeBid(bid,product){
    const bid_id=bid["value"]["id"];
    const product_id=bid["value"]["product_id"];
    try{
      product["value"]["bids"]=await this.bidService.finalizeBid(bid_id,product_id);
    }catch(ex){
      console.error(ex);
    }
  }

  async deleteProduct(productId){
    //const product_id=product["value"]["id"];
  // console.log(productId);
    try{
      this.products=await this.productService.removeProduct(productId);
    }catch(ex){
      console.error(ex);
    }

  }

}
