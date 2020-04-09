import { AdminBidService } from './../admin-bid.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BsNavbarComponent } from './../bs-navbar/bs-navbar.component';
import { FormsModule } from '@angular/forms';
import {  } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule  } from "@angular/common/http/testing";
///import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin.component';
import { BidService } from "../bid.service";
import { By } from '@angular/platform-browser';
import { RoleAuthGuard } from "../role-auth-guard.service";
import  mock_data from "../../assets/mock_products.json";
describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let bidService:BidService;
  let productService:AdminBidService;
  let mock_products=mock_data;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent,BsNavbarComponent],
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
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
   // console.log("hih");
    let roleauthguard=TestBed.get(RoleAuthGuard);
    //console.log(roleauthguard.auth);
    spyOn(roleauthguard.auth,"decodeToken").and.returnValue({token:"1234"});
     bidService=TestBed.get(BidService);
     productService=TestBed.get(AdminBidService);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });



  it("calls the saveProduct service and verifies",async(()=>{
    let val="testing";
    let product_obj={id:1,name:val, bids:[]};
    let products=fetch_product(product_obj);
    let field=InputEventRender(val,products);
    component.ngOnInit();
    fixture.detectChanges();
    let obj={code:200,products:[{ test:val}]};
    let spy=spyOn(productService,"saveProduct").and.returnValue(Promise.resolve(obj));
     productService.saveProduct(val);
     component.save(field);
    // console.log("spyreturn");
    // console.log(productService.saveProduct(val));

    // expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(val);

  }));

  it("saves the product and renders it",async(()=>{
    let val="testing";
    let product_obj={id:1,name:val, bids:[]};
    let products=fetch_product(product_obj);
    let field=InputEventRender(val,products);
    let products_obj={products:[{ test:val}]};
    let obj={code:200,...products_obj};
    spyOn(productService,"saveProduct").and.returnValue(Promise.resolve(obj));
    let prod_obj= productService.saveProduct(val);
    component.save(field);
    fixture.whenStable().then(()=>{
     // console.log(component.products, prod_obj["products"]);
      expect(component.products).toBe(products_obj["products"]);
    })


  }));

  it("deletes product from the list",async(()=>{

    let productId=2;
    let removed_prods=mock_products["products"].map((product,key)=>{
        if(product["id"]==productId){
          mock_products["products"].splice(key,1);
        }
    });
    ///console.log(mock_products)
    let spy=spyOn(productService,"removeProduct").withArgs(productId).and.returnValue(Promise.resolve(mock_products));
    component.deleteProduct(productId);
    fixture.whenStable().then(()=>{
     // console.log("drelete");
      //console.log(spy.calls.mostRecent());
      expect(component.products["products"].length).toBe(mock_products.products.length);
    })

  }));

  function fetch_product(obj){

    let save_obj={"code":200,products:[obj]};
    return save_obj;
  }

  function InputEventRender(val,save_obj={},bids=[]){


      let field: HTMLInputElement = fixture.debugElement.query(By.css('.bid-input')).nativeElement;
      field.value = val;
      field.dispatchEvent(new Event('input'));


      spyOn(bidService,"getProductBids").and.returnValue(Promise.resolve(save_obj));
       return field;
  }

});

