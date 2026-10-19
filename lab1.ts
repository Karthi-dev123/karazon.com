import * as readline from "readline/promises";
class CartItem {
  itemCode: string;
  description: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;

  constructor(itemCode: string, description: string, quantity: number, pricePerUnit: number) {
    this.itemCode = itemCode;
    this.description = description;
    this.quantity = quantity;
    this.pricePerUnit = pricePerUnit;
    this.totalPrice = quantity * pricePerUnit;
  }
}

const cart: CartItem[] = [];

async function main() {

    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let isflag : boolean = true;

    while(isflag){

    
      // get thet inputs 
      const itemCode  = await r1.question("Item Code : ");
      const description  = await r1.question("Description : ");
      const quantity = Number(await r1.question("Quantity : "));
      const pricePerUnit = Number(await r1.question("PricePerUnit : "));


      const item1: CartItem = new CartItem(itemCode,description,quantity,pricePerUnit);
      cart.push(item1);
      //console.log(cart);

      const decision :string = await r1.question("Do you want to add more items [y/n] : ");
      if(decision.trim().toLowerCase() === "n"){
        isflag = false;
      }
    }

    console.log("Printing entire cart items : ");
    console.log(cart);
    let globalTotal = 0.0;
    for(const i of cart){
      globalTotal += i.totalPrice;
    }
    console.log("Grand Total : " + globalTotal);





    const discountedTotal : number = await ApplyMembershipDiscount(globalTotal , r1);
    console.log("Discounted Total : " + discountedTotal);

    // lets apply gst and platform fee now 
    const GrandTotal : number = await ApplyGst(discountedTotal);
    // total after applying gst and platform fee 
    console.log("Grand Total : " + GrandTotal.toFixed(2));
    r1.close();




}
async function ApplyMembershipDiscount(globalTotal : number , r1 : readline.Interface){
  // no need to create too many input objects , stick w r1 alone 
  // const r2 = readline.createInterface({
  //   input : process.stdin,
  //   output : process.stdout
  // });
  let discountRate : number ;


  const isMember : string = await r1.question("Are you a member [y/n] : ");
  if(isMember.trim().toLowerCase() === "y"){
    // now that we know he's a member what's the membership type ? 
    const membershipType : string = await r1.question("membership type?  (Silver / Gold / Platinum) : ");
    switch(membershipType.trim().toLowerCase()){
      case "silver":
        discountRate = 0.05;
        break;
      case "gold":
        discountRate = 0.10;
        break;
      case "platinum":
        discountRate = 0.15;
        break;
      default:
        discountRate = 0.0;

    }

  }
  else{
    // means he is not a member 
    discountRate  = 0.0 ; 
  }
  if(discountRate > 0){
    console.log("Membership Discount applied !!! ");
  }
  else{

    console.log("No Discount Applied");
  }
  const discountAmount : number = globalTotal * discountRate;
  console.log("discounted amout : " + discountAmount );
  const discountedTotal : number = globalTotal - discountAmount;
  return discountedTotal;

}
// • gstRate (Number, e.g., 0.18)
// • platformFeeRate (Number, e.g., 0.002)
// • gstAmount (Number)
// • platformFee (Number)
// • totalWithTax (Number)
// Steps:
// 1. Use the discounted total from Lab 2.
// 2. Compute GST: discountedTotal * gstRate.
// 3. Compute platform fee: discountedTotal * platformFeeRate.
// 4. Add both to the discounted total.
// 5. Display updated total with tax and fees.
async function ApplyGst( discountedTotal : number){
  const gstRate : number = 0.18 ; 
  const platformFeeRate : number = 0.02 ; 

  const gstAmount : number = discountedTotal * gstRate;
  const platformFee : number = discountedTotal * platformFeeRate;

  // add both to ur discounted total and then return 

  console.log("GST & PLATFORM FEE APPLIED !!! ");
  console.log("GST Amount : " + gstAmount.toFixed(2));
  console.log("Platform Fee : " + platformFee.toFixed(2));

  const GrandTotal : number = discountedTotal + gstAmount + platformFee;
  return GrandTotal;

}
main();