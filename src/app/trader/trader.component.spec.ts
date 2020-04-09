import { By } from '@angular/platform-browser';
import { BsNavbarComponent } from './../bs-navbar/bs-navbar.component';
import { BidService } from './../bid.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RoleAuthGuard } from './../role-auth-guard.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderComponent } from './trader.component';
import  mock_data from "../../assets/mock_products.json";
import { Stream } from 'stream';

let mock_products=mock_data;
describe('TraderComponent', () => {
  let component: TraderComponent;
  let fixture: ComponentFixture<TraderComponent>;
  let bidService:BidService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderComponent,BsNavbarComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule
      ],
      providers:[BidService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderComponent);
    component = fixture.componentInstance;
    let roleauthguard=TestBed.get(RoleAuthGuard);
    bidService=TestBed.get(BidService);
    //console.log(roleauthguard.auth);
    spyOn(roleauthguard.auth,"decodeToken").and.returnValue({token:"1234","user_id":4});
   // fixture.detectChanges();
  });

  it('should save bids within the product', async(async (done) => {

    spyOn(bidService,"getProductBids").and.returnValue(Promise.resolve(mock_products));
    component.products=mock_products["products"];
    component.ngOnInit();
    fixture.detectChanges();
    let productId=3;
    let mod_products=JSON.parse(JSON.stringify(mock_products))
    //console.log(mock_products["products"]);
    let productWIthKey= getProduct(productId);
    console.log("dsave bids");
    //console.log(productWIthKey);
    let price=23;
    let field=getInputField(price,productId);
    let bid_obj={
      id:4,
      user_id:5,
      product_id:productId,
      price:price,
      is_finalized:false
    };
    let prod_obj={
      product_id:productId,
      price:field.value,
      user_id:4
    }
    let productIndex=productWIthKey["id"];
    //console.log(mod_products["products"][productIndex-1]["bids"]);
    mod_products["products"][productIndex-1]["bids"].push(bid_obj);

    let spy=spyOn(bidService,"saveBids").withArgs(prod_obj).and.returnValue(Promise.resolve(mod_products["products"][productIndex-1]["bids"]));
    //console.log(mock_products["products"][productIndex-1]);
    //let spyComp=spyOn(component,"save");
    //let spyComp=spyOn(component,"save").and.callThrough();
   // await expect(async()=>{
      component.save(field,mock_products["products"][productIndex-1]["bids"],
      mock_products["products"][productIndex-1]).then(()=>{
        expect(component.products.length).toBe(mod_products["products"].length);
      }).catch((ex)=>{
        console.error(ex);
       expect(ex).toBeInstanceOf(Error);
      })

      //throw new Error("testsfs");
       // })

    //throw new Error("test");
   // expect(component).toBeTruthy();

  }));

  function getProduct(productId){

    let products=mock_products["products"].filter((product,key)=>{
      if(product["id"]==productId){
        return {
          product:product,
          index:key
        };
      }
    });
    {

    }
    return products[0];
  }

  function getInputField(val,productId){
    //console.log(fixture.debugElement.query(By.css(".container")));
    let field:HTMLInputElement =  fixture.debugElement.query(By.css(".trader-tble #prod-"+productId+" .place-bid input")).nativeElement;
    //console.log(field);

    field.value=val;

    return field;
  }
});
