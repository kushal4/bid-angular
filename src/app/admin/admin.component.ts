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
  constructor(private productService:AdminBidService,private bidService:BidService) { }


  async ngOnInit(): Promise<void> {
    try{
      let products_obj= await this.bidService.getProductBids();
      this.products=products_obj["products"];
    }catch(ex){
      console.log(ex);
    }

  }


 async save(prodInput : HTMLInputElement){
   console.log(this.product);
   prodInput.value="";
   try{
    let products_obj =await this.productService.saveProduct(this.product)
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

  async deleteProduct(product){
    const product_id=product["value"]["id"];
    console.log(product_id);
    try{
      this.products=await this.productService.removeProduct(product_id);
    }catch(ex){
      console.error(ex);
    }

  }

}
