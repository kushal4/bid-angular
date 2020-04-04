import { AuthService } from './../auth.service';
import { BidService } from './../bid.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.scss']
})
export class TraderComponent implements OnInit {

  constructor(private bidService:BidService,private authService:AuthService) { }

  products=[];
  currProdId=-1;
  canBidPlace=true;

  async ngOnInit(): Promise<void> {
    try{
      let products_obj= await this.bidService.getProductBids();
      this.products=products_obj["products"];
    }catch(ex){
      console.log(ex);
    }
  }

  async save(prodInput : HTMLInputElement,bids=[],product){

      //console.log(product["id"]);
      this.currProdId=product["value"]["id"];
      this.canBidPlace=true;
      bids.map(bid=>{
          if(prodInput.value==bid["price"] || prodInput.value <bid["price"] || prodInput.value==""){
            this.canBidPlace=false;
          }
      });

      if(this.canBidPlace){
        let decoded_token=this.authService.decodeToken();
        let user_id=decoded_token["user_id"];
        let product_obj={
          product_id:product["value"]["id"],
          price:prodInput.value,
          user_id
        };
        try{
          product["value"]["bids"] =await this.bidService.saveBids(product_obj);
          prodInput.value="";
        }catch(ex){
            console.error(ex);
        }

      }
  }




}
